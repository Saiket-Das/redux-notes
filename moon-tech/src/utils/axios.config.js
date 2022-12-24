import axios from "axios";

let URL;

switch (process.env.REACT_APP_ENVIRONMENT) {
  case "DEVELOPMENET":
    URL = "http://localhost:5000/api/";
    break;
  case "PRODUCTION":
    URL = "https://moontech/api/";
    break;
  default:
    URL = "http://localhost:5000/api/";
}

const instance = axios.create({
  baseURL: URL,
});

export default instance;
