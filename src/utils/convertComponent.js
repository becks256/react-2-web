import { reactToCustomEl } from "./reactToCustomEl";

export const convertComponent = (componentName, ReactComponent) => {
  
  const WebComponent = reactToCustomEl(ReactComponent);
  customElements.define(componentName, WebComponent);

}