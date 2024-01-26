import { parseArrayOfObjectsAsJSX, parseObjectAsJSX } from "../parseObject";
export const convertStringHTMLToJSXForProp = (value) => {
  const jsonifiedValue = JSON.parse(value);
  return jsonifiedValue instanceof Array
    ? parseArrayOfObjectsAsJSX(jsonifiedValue)
    : parseObjectAsJSX(jsonifiedValue);
};
