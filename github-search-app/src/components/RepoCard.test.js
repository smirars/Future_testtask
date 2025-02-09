import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RepoCard } from "../components/RepoCard";

test("RepoCard отображает корректные данные", () => {
  const repo = {
    name: "my-repo",
    description: "Описание репозитория",
    html_url: "https://github.com/user/my-repo",
    stargazers_count: 42,
    updated_at: "2024-02-08T12:34:56Z",
  };

  render(<RepoCard {...repo} />);

  expect(screen.getByText("my-repo")).toBeInTheDocument();
  expect(screen.getByText("Описание репозитория")).toBeInTheDocument();
  expect(screen.getByText(/Звезды:/).parentElement).toHaveTextContent("Звезды: 42");
  expect(screen.getByRole("link", { name: "my-repo" })).toHaveAttribute(
    "href",
    "https://github.com/user/my-repo"
  );
});
