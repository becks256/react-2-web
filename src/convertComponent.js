import { reactToCustomEl } from "./reactToCustomEl";

export const convertComponent = (
  componentName,
  ReactComponent,
  { parse } = {}
) => {
  const WebComponent = reactToCustomEl(ReactComponent, { parse });
  customElements.define(componentName, WebComponent);
};
