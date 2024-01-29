import React from "react"
import ReactDOM from "react-dom/client"
import {
  convertFunction,
  kebabToCamelCase,
  convertStringHTMLToJSXForProp,
  createSharedStyles,
} from "./utils/index.js"

export const reactToCustomEl = (ReactComponent, config) => {
  const { parse = false, sharedStyles = undefined } = config

  return class extends HTMLElement {
    static get observedAttributes() {
      return Object.keys(ReactComponent.propTypes || [])
    }

    constructor() {
      super()
      // Initialize the root instance variable
      this.root = null
    }

    connectedCallback() {
      // Render the component
      this.mountReactComponent()
    }

    mountReactComponent() {
      const { hasChildren, ...props } = this.getProps()

      // Only create the root if it doesn't already exist
      if (!this.root) {
        this.root = ReactDOM.createRoot(this.attachShadow({ mode: "open" }))
        if (!!sharedStyles) {
          this.shadowRoot.adoptedStyleSheets = [
            createSharedStyles(sharedStyles),
          ]
        }
      }

      // Render the React component
      this.root.render(
        hasChildren ? (
          <ReactComponent {...props}>
            <slot />
          </ReactComponent>
        ) : (
          <ReactComponent {...props} />
        )
      )
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.mountReactComponent()
      }
    }

    disconnectedCallback() {
      // Unmount the component if the root exists
      if (this.root) {
        this.root.unmount()
      }
    }

    getProps() {
      const props = {}
      for (const attribute of this.attributes) {
        const name = kebabToCamelCase(attribute.name)
        const value = attribute.value

        // Attempt to parse JSON attributes
        try {
          if (config.parse && config.parse.includes(name)) {
            props[name] = convertStringHTMLToJSXForProp(value)
            continue
          }
          if (name === "class") {
            props["className"] = value
            continue
          }
          if (name.startsWith("on")) {
            const events = {
              onchange: "onChange",
              onclick: "onClick",
              ondblclick: "onDoubleClick",
              onmousedown: "onMouseDown",
              onmouseenter: "onMouseEnter",
              onmouseleave: "onMouseLeave",
              onmousemove: "onMouseMove",
              onmouseout: "onMouseOut",
              onmouseover: "onMouseOver",
              onmouseup: "onMouseUp",
              onkeydown: "onKeyDown",
              onkeypress: "onKeyPress",
              onkeyup: "onKeyUp",
              onabort: "onAbort",
            }
            props[events[name]] = convertFunction(value)
            continue
          }
          props[name] = JSON.parse(value)
        } catch (e) {
          // Fallback to string if JSON parsing fails
          props[name] = value
        }
      }
      props.hasChildren =
        this.childNodes.length || this.childElementCount || this.children.length
      return props
    }
  }
}
