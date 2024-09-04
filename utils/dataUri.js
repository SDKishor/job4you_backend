import DataURIParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataURIParser();
  const ext = path.extname(file.originalname).toString();
  const datauri = parser.format(ext, file.buffer);
  return datauri;
};
export default getDataUri