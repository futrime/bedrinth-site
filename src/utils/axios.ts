import axios from "axios";
const httpService = axios.create({baseURL:'https://api.lippkg.com/v1/'});
export default httpService;
