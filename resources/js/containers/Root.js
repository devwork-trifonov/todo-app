import React from "react";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import App from "../containers/App";
import { fetchTodos } from "../actions/todos";
import fetchUser from "../actions/user";
import { fetchNotes } from "../actions/notes";

const store = configureStore();
document.addEventListener("DOMContentLoaded", () => {
	const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
	store.dispatch(fetchUser(csrfToken));
	store.dispatch(fetchTodos(csrfToken));
	store.dispatch(fetchNotes(csrfToken));
});
export default function Root() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}
