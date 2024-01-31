import { reactToCustomEl } from "./reactToCustomEl";

export const convertComponent = (
  componentName,
  ReactComponent,
  { ...config }
) => {
  const WebComponent = reactToCustomEl(ReactComponent, { ...config });
  customElements.define(componentName, WebComponent);
};
