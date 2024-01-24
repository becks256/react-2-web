import React from "react";
import ReactDOM from "react-dom/client";
import { kebabToCamelCase } from "./kebab2Camel";
import { styles } from "../styles/kds.min.js";
import { convertFunction } from "./convertFunction.js";

let sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(styles);

export const reactToCustomEl = (ReactComponent) => {
  return class extends HTMLElement {
    connectedCallback() {
      const { hasChildren, ...props } = this.getProps();
      const root = ReactDOM.createRoot(this.attachShadow({ mode: "open" }));
      root.render(
        hasChildren ? (
          <ReactComponent {...props}>
            <slot />
          </ReactComponent>
        ) : (
          <ReactComponent {...props} />
        )
      );
      this.shadowRoot.adoptedStyleSheets = [sharedStyles];
    }

    getProps() {
      const props = {};
      for (const attribute of this.attributes) {
        const name = kebabToCamelCase(attribute.name);
        const value = attribute.value;

        // Attempt to parse JSON attributes
        try {
          if (name === "class") {
            props["className"] = value;
            continue;
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
            };
            props[events[name]] = convertFunction(value);
            continue;
          }
          props[name] = JSON.parse(value);
        } catch (e) {
          // Fallback to string if JSON parsing fails
          props[name] = value;
        }
      }
      props.hasChildren =
        this.childNodes.length ||
        this.childElementCount ||
        this.children.length;
      return props;
    }

    disconnectedCallback() {
      ReactDOM.unmountComponentAtNode(this.shadowRoot);
    }
  };
};
