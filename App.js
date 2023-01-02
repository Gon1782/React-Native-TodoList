import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import ToDoList from "./pages/todolist";
import React from "react";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <ToDoList />
    </Provider>
  );
}
