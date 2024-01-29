export const createSharedStyles = (styles) => {
  let sharedStyles = new CSSStyleSheet()
  sharedStyles.replaceSync(styles)
}
