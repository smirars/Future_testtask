import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HomePage } from "./pages/HomePage";
import "./App.css"

export const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};
