import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  requestToGetDirectory,
  requestToGetDirectoryInRepository,
  requestToGetFileContent,
} from "../../../services/api/DirectoriesApi";
import { DirectoryTypes } from "../../../utils/types/DirectoryTypes";
import "./GitHubDirectoryViewPage.css";

const DirectoryViewPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [directoryItems, setDirectoryItems] = useState<DirectoryTypes>([]);
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(
    null
  );
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        const repository = pathname.split("/")[2];
        const path = pathname.split("/").slice(3).join("/");
        let data;
        if (path) {
          data = await requestToGetDirectory({
            repository,
            path: path ? path : "",
          });
        } else {
          data = await requestToGetDirectoryInRepository(repository);
        }
        setDirectoryItems(data);
        setIsFileSelected(false);
      } catch (error) {
        console.error("Error fetching directory data:", error);
      }
    };

    fetchDirectory();
  }, [pathname]);

  const handleFileClick = async (fileName: string) => {
    try {
      const repository = pathname.split("/")[2];
      const path = pathname.split("/").slice(3).join("/");
      const content = await requestToGetFileContent({
        repository,
        path: path ? `${path}/${fileName}` : fileName,
      });
      setSelectedFileContent(content);
      setIsFileSelected(true);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const renderDirectory = () => {
    const sortedItems = directoryItems.sort((a, b) => {
      if (a.type === "dir" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "dir") return 1;
      return 0;
    });

    return sortedItems.map((item) => (
      <div key={item.name} className="directory-item">
        {item.type === "dir" ? (
          <button
            onClick={() => navigate(`${pathname}/${item.name}`)}
            className="dir"
          >
            <img
              src={require("../../../assets/FolderIcon.png")}
              alt="Folder"
              className="icon"
            />
            {item.name}/
          </button>
        ) : (
          <button className="file" onClick={() => handleFileClick(item.name)}>
            <img
              src={require("../../../assets/FileIcon.png")}
              alt="File"
              className="icon"
            />
            {item.name}
          </button>
        )}
      </div>
    ));
  };

  return (
    <div>
      {!isFileSelected ? (
        renderDirectory()
      ) : (
        <div className="file-content">
          <h3>File Content:</h3>
          <pre>{selectedFileContent}</pre>
          <button onClick={() => setIsFileSelected(false)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default DirectoryViewPage;
