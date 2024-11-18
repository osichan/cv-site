import { AxiosRequestConfig } from "axios";
import API_URL from "../../constants/API";

type tokenConfigProps = {
  method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
  endpoint: string;
  body?: any;
};
const tokenConfig = async ({
  method,
  endpoint,
  body,
}: tokenConfigProps): Promise<AxiosRequestConfig<any>> => {
  console.log("=============tokenConfig=======================");
  console.log({
    url: `${API_URL}/${endpoint}`,
    method,
    data: body,
  });
  console.log("====================================");
  const config: AxiosRequestConfig = {
    url: `${API_URL}/${endpoint}`,
    method,
    data: body,
  };
  return config;
};

export default tokenConfig;
