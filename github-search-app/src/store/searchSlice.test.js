import searchReducer, { setUsername, resetRepositories } from "../store/searchSlice";

test("setUsername обновляет имя пользователя и очищает репозитории", () => {
  const initialState = { username: "", repositories: [], status: "idle", page: 1, hasMore: true };

  const newState = searchReducer(initialState, setUsername("new-user"));

  expect(newState.username).toBe("new-user");
  expect(newState.repositories).toEqual([]);
  expect(newState.page).toBe(1);
  expect(newState.hasMore).toBe(true);
});
