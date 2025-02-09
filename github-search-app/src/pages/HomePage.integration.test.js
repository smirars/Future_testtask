import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { HomePage } from "../pages/HomePage";

const mockStore = configureStore([]);

test("HomePage рендерит поле ввода", () => {
  const store = mockStore({
    search: { username: "", repositories: [], status: "idle", page: 1, hasMore: true },
  });

  render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );

  expect(screen.getByPlaceholderText("Введите имя пользователя GitHub")).toBeInTheDocument();
});
