import React from "react";

// Компонент для отображения информации о репозитории
export const RepoCard = ({ name, description, html_url, stargazers_count, updated_at }) => {
  // Форматируем дату последнего обновления
  const formattedDate = new Date(updated_at).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Если описание отсутствует, показываем текст "Описание отсутствует"
  const repoDescription = description || "Описание отсутствует";

  return (
    <div className="repo-card">
      <h3>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h3>
      <p>{repoDescription}</p>
      <p><strong>Звезды:</strong> {stargazers_count}</p>
      <p><strong>Последнее обновление:</strong> {formattedDate}</p>
    </div>
  );
};

