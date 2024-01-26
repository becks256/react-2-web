import parse from "html-react-parser";

export const parseObjectAsJSX = (obj) => {
  const objClone = { ...obj };
  Object.entries(obj).map(([key, value]) => {
    objClone[key] =
      typeof value === "string" ? parse(value) : parseObjectAsJSX(value);
  });
  return objClone
};

export const parseArrayOfObjectsAsJSX = (arr) => {
  return arr.map((obj) => parseObjectAsJSX(obj));
};
