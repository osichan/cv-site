import axiosConfig from "../../utils/helpers/api/axiosConfig";
import defaultTryForAxios from "../../utils/helpers/api/defaultTryForAxios";
import { AllRepositoriesType } from "../../utils/types/RepositoriesTypes";

// Update the type signature to accept setError
const requestToGetAllEpisodes: (
  setError: (message: string | null) => void
) => Promise<AllRepositoriesType> = async (setError) => {
  try {
    const config = await axiosConfig({
      method: "GET",
      endpoint: "github",
    });

    const result = await defaultTryForAxios({ config, setError });

    if (result && typeof result !== "boolean") {
      return result.data as AllRepositoriesType;
    }
    throw new Error("Failed to fetch data");
  } catch (error) {
    setError("Failed to fetch all episodes. Please try again later.");
    throw error;
  }
};

export { requestToGetAllEpisodes };
