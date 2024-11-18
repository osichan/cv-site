import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  requestToGetDirectory,
  requestToGetDirectoryInRepository,
  requestToGetFileContent,
} from "../../../services/api/DirectoriesApi";
import { DirectoryTypes } from "../../../utils/types/DirectoryTypes";
import "./GitHubDirectoryViewPage.css";
import { useError } from "../../../utils/context/ErrorContext";

const DirectoryViewPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setError } = useError(); // Access the error setter

  const [directoryItems, setDirectoryItems] = useState<DirectoryTypes>([]);
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(
    null
  );
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch the directory contents or repository details
  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        setLoading(true); // Set loading to true
        const repository = pathname.split("/")[2];
        const path = pathname.split("/").slice(3).join("/");

        let data;
        if (path) {
          data = await requestToGetDirectory(
            {
              repository,
              path: path ? path : "",
            },
            setError
          );
        } else {
          data = await requestToGetDirectoryInRepository(repository, setError);
        }

        setDirectoryItems(data);
        setIsFileSelected(false);
      } catch (error) {
        console.error("Error fetching directory data:", error);
        setError("Failed to fetch directory data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchDirectory();
  }, [pathname, setError]);

  // Navigate back to the parent directory
  const handleBackClick = () => {
    const segments = pathname.split("/");
    if (segments.length > 3) {
      const parentPath = segments.slice(0, -1).join("/");
      navigate(parentPath);
    }
  };

  // Fetch file content when a file is clicked
  const handleFileClick = async (fileName: string) => {
    try {
      setLoading(true); // Set loading to true
      const repository = pathname.split("/")[2];
      const path = pathname.split("/").slice(3).join("/");

      const content = await requestToGetFileContent(
        {
          repository,
          path: path ? `${path}/${fileName}` : fileName,
        },
        setError
      );

      setSelectedFileContent(content);
      setIsFileSelected(true);
    } catch (error) {
      console.error("Error fetching file content:", error);
      setError("Failed to fetch file content. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  // Sort and render the directory items (directories first, then files)
  const renderDirectory = () => {
    const sortedItems = directoryItems.sort((a, b) => {
      if (a.type === "dir" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "dir") return 1;
      return 0;
    });

    return (
      <div>
        {pathname.split("/").slice(3).join("/") ? (
          <button onClick={handleBackClick} className="dir">
            <img
              src={require("../../../assets/FolderIcon.png")}
              alt="Folder"
              className="icon"
            />
            ..
          </button>
        ) : (
          <button
            onClick={() => navigate("/github")}
            className="dir"
            style={{ marginBottom: 14 }}
          >
            {"<-- go back to repos"}
          </button>
        )}
        {sortedItems.map((item) => (
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
              <button
                className="file"
                onClick={() => handleFileClick(item.name)}
              >
                <img
                  src={require("../../../assets/FileIcon.png")}
                  alt="File"
                  className="icon"
                />
                {item.name}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div> // Show loading state while data is fetching
      ) : !isFileSelected ? (
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
