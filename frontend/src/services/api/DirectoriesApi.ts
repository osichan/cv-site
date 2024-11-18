import axiosConfig from "../../utils/helpers/api/axiosConfig";
import defaultTryForAxios from "../../utils/helpers/api/defaultTryForAxios";
import { DirectoryTypes } from "../../utils/types/DirectoryTypes";

interface requestToGetDirectoryProps {
  repository: string;
  path: string;
}

const requestToGetDirectory = async (
  { repository, path }: requestToGetDirectoryProps,
  setError: (message: string | null) => void
): Promise<DirectoryTypes> => {
  try {
    const config = await axiosConfig({
      method: "POST",
      endpoint: `github/${repository}${path && "/contents"}`,
      body: { path },
    });

    const result = await defaultTryForAxios({ config, setError });

    if (result && typeof result !== "boolean") {
      return result.data as DirectoryTypes;
    }
    throw new Error("Failed to fetch data");
  } catch (error) {
    setError("Failed to load directory data. Please try again later.");
    throw error;
  }
};

const requestToGetDirectoryInRepository = async (
  repository: string,
  setError: (message: string | null) => void
): Promise<DirectoryTypes> => {
  try {
    const config = await axiosConfig({
      method: "GET",
      endpoint: `github/${repository}`,
    });

    const result = await defaultTryForAxios({ config, setError });

    if (result && typeof result !== "boolean") {
      return result.data as DirectoryTypes;
    }
    throw new Error("Failed to fetch data");
  } catch (error) {
    setError("Failed to load repository data. Please try again later.");
    throw error;
  }
};

const requestToGetFileContent = async (
  { repository, path }: requestToGetDirectoryProps,
  setError: (message: string | null) => void
): Promise<string> => {
  try {
    const config = await axiosConfig({
      method: "POST",
      endpoint: `github/${repository}/contents`,
      body: { path },
    });

    const result = await defaultTryForAxios({ config, setError });

    if (result && typeof result !== "boolean") {
      return result.data as string;
    }
    throw new Error("Failed to fetch data");
  } catch (error) {
    setError("Failed to load file content. Please try again later.");
    throw error;
  }
};

export {
  requestToGetDirectory,
  requestToGetFileContent,
  requestToGetDirectoryInRepository,
};
