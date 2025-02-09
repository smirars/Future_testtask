import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRepositories, setUsername, resetRepositories } from "../store/searchSlice";
import { RepoCard } from "../components/RepoCard";

export const getErrorMessage = (error) => {
    if (!error) return null;
  
    switch (error.status) {
      case 404:
        return "Такого пользователя не существует.";
      case 403:
        return "Превышен лимит запросов к API GitHub.";
      case 500:
        return "Ошибка сервера. Попробуйте позже.";
      default:
        return "Произошла ошибка. Попробуйте снова.";
    }
  };


export const HomePage = () => {
  const dispatch = useDispatch();
  const { username, repositories, status, error, page, hasMore, initialLoading } = useSelector(
    (state) => state.search
  );

  const [inputValue, setInputValue] = useState(username);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!inputValue.trim()) {
        dispatch(resetRepositories()); 
        return;
      }

      if (inputValue.trim() !== username) {
        dispatch(resetRepositories());
        dispatch(setUsername(inputValue.trim()));
        dispatch(fetchUserRepositories({ username: inputValue.trim(), page: 1 }));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch, username]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && status !== "loading") {
        dispatch(fetchUserRepositories({ username, page }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, hasMore, page]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Введите имя пользователя GitHub"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />

      {/* Главная анимация загрузки (только при первом поиске) */}
      {initialLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}

      {error && <p className="error">{getErrorMessage(error)}</p>}

      {repositories.length > 0 ? (
        repositories.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            description={repo.description}
            html_url={repo.html_url}
            stargazers_count={repo.stargazers_count}
            updated_at={repo.updated_at}
          />
        ))
      ) : (
        status === "succeeded" && <p>Репозиториев не найдено</p>
      )}

      {/* Анимация подгрузки при прокрутке (но НЕ при первом поиске) */}
      {hasMore && status === "loading" && !initialLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};




