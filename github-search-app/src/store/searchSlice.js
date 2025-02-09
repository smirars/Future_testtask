import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserRepositories = createAsyncThunk(
    "search/fetchUserRepositories",
    async ({ username, page }, { rejectWithValue }) => {
      try {
        const token = process.env.REACT_APP_GITHUB_TOKEN
  
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=20&page=${page}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
  
        if (!response.ok) throw new Error("Ошибка: " + response.status);
        const data = await response.json();
        
        return { repos: data, page, hasMore: data.length === 20 };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  const searchSlice = createSlice({
    name: "search",
    initialState: {
      username: "",
      repositories: [],
      status: "idle",
      error: null,
      page: 1,
      hasMore: true,
      initialLoading: false, // <== Добавили состояние первичной загрузки
    },
    reducers: {
      setUsername: (state, action) => {
        state.username = action.payload;
        state.repositories = [];
        state.status = "idle";
        state.page = 1;
        state.hasMore = true;
        state.initialLoading = false; // <== Сброс при новом поиске
      },
      resetRepositories: (state) => {
        state.repositories = [];
        state.page = 1;
        state.hasMore = true;
        state.initialLoading = false; // <== Сброс при очистке
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserRepositories.pending, (state, action) => {
          state.status = "loading";
          state.error = null;
          if (action.meta.arg.page === 1) {
            state.initialLoading = true; // <== Только при первом запросе
          }
        })
        .addCase(fetchUserRepositories.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.initialLoading = false; // <== Первичная загрузка завершена
          state.repositories = [...state.repositories, ...action.payload.repos];
          state.page = action.payload.page + 1;
          state.hasMore = action.payload.hasMore;
        })
        .addCase(fetchUserRepositories.rejected, (state, action) => {
          state.status = "failed";
          state.error = { status: action.payload?.status || 500 };
          state.initialLoading = false;
        });
    },
  });
  

export const { setUsername, resetRepositories } = searchSlice.actions;
export default searchSlice.reducer;


