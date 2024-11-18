import axiosConfig from "../../utils/helpers/api/axiosConfig";
import defaultTryForAxios from "../../utils/helpers/api/defaultTryForAxios";
import { ProfileInfo } from "../../utils/types/ProfileType";

const requestToGetProfileInfo: (
  setError: (message: string | null) => void
) => Promise<ProfileInfo> = async (
  setError: (message: string | null) => void
) => {
  const config = await axiosConfig({
    method: "GET",
    endpoint: "github/profile",
  });
  const result = await defaultTryForAxios({ config, setError });
  console.log("API Response:", result);

  if (result && typeof result !== "boolean") {
    return result.data as ProfileInfo;
  }
  throw new Error("Failed to fetch data");
};

export { requestToGetProfileInfo };
