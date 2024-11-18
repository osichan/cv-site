import axiosConfig from "../../utils/helpers/api/axiosConfig";
import defaultTryForAxios from "../../utils/helpers/api/defaultTryForAxios";
import { DirectoryTypes } from "../../utils/types/DirectoryTypes";

interface requestToGetDirectoryProps {
  repository: string;
  path: string;
}

const requestToGetDirectory = async ({
  repository,
  path,
}: requestToGetDirectoryProps): Promise<DirectoryTypes> => {
  const config = await axiosConfig({
    method: "POST",
    endpoint: `github/${repository}${path && "/contents"}`,
    body: { path },
  });
  const result = await defaultTryForAxios({ config });

  if (result && typeof result !== "boolean") {
    return result.data as DirectoryTypes;
  }
  throw new Error("Failed to fetch data");
};

const requestToGetDirectoryInRepository = async (
  repository: string
): Promise<DirectoryTypes> => {
  const config = await axiosConfig({
    method: "GET",
    endpoint: `github/${repository}`,
  });
  const result = await defaultTryForAxios({ config });

  if (result && typeof result !== "boolean") {
    return result.data as DirectoryTypes;
  }
  throw new Error("Failed to fetch data");
};

const requestToGetFileContent = async ({
  repository,
  path,
}: requestToGetDirectoryProps): Promise<string> => {
  const config = await axiosConfig({
    method: "POST",
    endpoint: `github/${repository}/contents`,
    body: { path },
  });
  const result = await defaultTryForAxios({ config });

  if (result && typeof result !== "boolean") {
    return result.data as string;
  }
  throw new Error("Failed to fetch data");
};

export {
  requestToGetDirectory,
  requestToGetFileContent,
  requestToGetDirectoryInRepository,
};
