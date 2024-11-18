import axiosConfig from "../../utils/helpers/api/axiosConfig";
import defaultTryForAxios from "../../utils/helpers/api/defaultTryForAxios";
import { ProfileInfo } from "../../utils/types/ProfileType";

const requestToGetProfileInfo: () => Promise<ProfileInfo> = async () => {
  const config = await axiosConfig({
    method: "GET",
    endpoint: "github/profile",
  });
  const result = await defaultTryForAxios({ config });

  if (result && typeof result !== "boolean") {
    return result.data as ProfileInfo;
  }
  throw new Error("Failed to fetch data");
};

export { requestToGetProfileInfo };
