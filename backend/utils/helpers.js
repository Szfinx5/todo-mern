import bunyan from "bunyan";

export const isEmpty = (objectName) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

export const logger = bunyan.createLogger({ name: "todo-app" });
