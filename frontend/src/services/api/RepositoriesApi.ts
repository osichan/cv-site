import axiosConfig from "../../utils/helpers/api/axiosConfig";
import defaultTryForAxios from "../../utils/helpers/api/defaultTryForAxios";
import { AllRepositoriesType } from "../../utils/types/RepositoriesTypes";

const requestToGetAllEpisodes: () => Promise<AllRepositoriesType> =
  async () => {
    const config = await axiosConfig({
      method: "GET",
      endpoint: "github",
    });
    const result = await defaultTryForAxios({ config });

    if (result && typeof result !== "boolean") {
      return result.data as AllRepositoriesType;
    }
    throw new Error("Failed to fetch data");
  };

export { requestToGetAllEpisodes };
