import { useCommonSettings } from "@/store/common";
import axios from "axios";
const httpService = axios.create({baseURL:'https://api.lippkg.com/v1/'});
httpService.interceptors.request.use(function (config) {
  // console.log(config)
  const userStore = useCommonSettings();
  // 在发送请求之前做些什么
  config.headers['Accept-Language']=`${userStore.locale}, cn;q=0.9, en:q=0.8, *q=0.5`
  return config;
});
export default httpService;
