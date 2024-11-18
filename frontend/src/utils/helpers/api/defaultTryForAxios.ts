import axios, { AxiosRequestConfig, AxiosError } from "axios";

type defaultTryProps = {
  config: AxiosRequestConfig<any>;
  setError: (message: string | null) => void;
};

const defaultTry = async ({ config, setError }: defaultTryProps) => {
  try {
    return await axios(config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response?.status && axiosError.response.status < 500) {
        setError("Something went wrong. Please check your input.");
      } else {
        setError("Network error. Please try again later.");
      }
    } else {
      setError("An unexpected error occurred.");
      throw error;
    }
  }
};

export default defaultTry;
