import axios, { AxiosRequestConfig, AxiosError } from "axios";

type defaultTryProps = {
  config: AxiosRequestConfig<any>;
};

const defaultTry = async ({ config }: defaultTryProps) => {
  try {
    return await axios(config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status && axiosError.response.status < 500) {
      } else {
      }
    } else {
      throw error;
    }
  }
};

export default defaultTry;
