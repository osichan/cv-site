import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestToGetAllEpisodes } from "../../../services/api/RepositoriesApi";
import { AllRepositoriesType } from "../../../utils/types/RepositoriesTypes";
import "./GitHubHomePage.css";
import { ProfileInfo } from "../../../utils/types/ProfileType";
import { requestToGetProfileInfo } from "../../../services/api/ProfileApi";
import { useError } from "../../../utils/context/ErrorContext";

const GitHubHomePage = () => {
  const [AllRepositories, setAllRepositories] = useState<AllRepositoriesType>(
    []
  );
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

  const navigate = useNavigate();
  const { setError } = useError();

  const getData = async () => {
    const data = await requestToGetAllEpisodes(setError);
    setAllRepositories(data);
  };

  const getProfile = async () => {
    const data = await requestToGetProfileInfo(setError);
    setProfileInfo(data);
  };

  useEffect(() => {
    getData();
    getProfile();
  }, []);

  const handleClick = (repository: string) => {
    navigate(`/github/${repository}`);
  };

  return (
    <div className="home-container">
      <div className="profile-sidebar">
        {profileInfo && (
          <>
            <img
              src={profileInfo.avatar_url}
              alt={`${profileInfo.name}'s avatar`}
              className="profile-avatar"
            />
            <h2>{profileInfo.name}</h2>
            <p>{profileInfo.bio}</p>
            <p>
              <strong>Location:</strong> {profileInfo.location}
            </p>
            <p>
              <strong>Email:</strong> {profileInfo.email || "N/A"}
            </p>
            <a
              href={`https://github.com/${profileInfo.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Profile
            </a>
          </>
        )}
      </div>

      <div className="repositories-container">
        <h2>GitHub Repositories</h2>
        <div className="repositories-grid">
          {AllRepositories.map((repository, index) => (
            <button
              key={index}
              className="repository-item"
              onClick={() => handleClick(repository.name)}
            >
              <h1>{repository.name}</h1>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubHomePage;
