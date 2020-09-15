import React, { useEffect, useState, useReducer, useRef } from "react";
import { Route, NavLink, useParams, Link } from "react-router-dom";
import AddTodoForm from "../forms/AddTodoForm";
import { NavBar } from "../navigation/CategoryNavigation";
import { NavBarBurger } from "../navigation/CategoryNavigationBurger";
import { Note } from "../notes/Note";
import { AddNote } from "../forms/AddNote";
import { TodoEdit } from "./TodoEdit";
import { TodoElement, CompletedTodoElement } from "./TodoElement";

const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content;

export default function TodoApp({
	todos,
	todayTodos,
	tommorowTodos,
	weekTodos,
	expiredTodos,
	user,
	addTodo,
	successAddedTodo,
	completedTodos,
	notes,
	addNote,
	setBody,
	successReceiveNote,
	setNoteBody,
	deleteNote,
	completeTodo,
	restoreTodo,
	deleteTodo,
	logout,
}) {
	const { list } = useParams();
	let todoList;
	let todoListName;
	const [navBarState, setNavBarState] = useState();

	useEffect(() => {
		if (window.innerWidth > 992) {
			setNavBarState(true);
		} else setNavBarState(false);
	}, []);

	function toggleNavBarState() {
		setNavBarState((prev) => !prev);
	}

	useEffect(() => {
		return () =>
			document.removeEventListener("click", dropdownEventHandler);
	});

	function copyArray(arr) {
		return arr.map((item) => {
			return Object.assign({}, item);
		});
	}
	function toggleClass() {
		dropdown.current.classList.toggle("dropdown-menu_opened");
		document.addEventListener("click", dropdownEventHandler);
	}

	function dropdownEventHandler(e) {
		if (
			dropdown.current.classList.contains("dropdown-menu_opened") &&
			e.target !== dropdownBtn.current &&
			!dropdown.current.contains(e.target)
		) {
			dropdown.current.classList.remove("dropdown-menu_opened");
			document.removeEventListener("click", dropdownEventHandler);
		}
	}
	const dropdown = useRef();
	const dropdownBtn = useRef();

	switch (list) {
		case "all":
			todoList = copyArray(todos);
			todoListName = "Все задачи";
			break;
		case "today":
			todoList = copyArray(todayTodos);
			todoListName = "Сегодня";
			break;
		case "tommorow":
			todoList = copyArray(tommorowTodos);
			todoListName = "Завтра";

			break;

		case "week":
			todoList = copyArray(weekTodos);
			todoListName = "Неделя";
			break;

		default:
			todoList = copyArray(todos);
			todoListName = "Все задачи";
			break;
	}

	return (
		<>
			<div className="todo-top-bar" key={0}>
				<div
					className="todo-top-bar__settings"
					ref={dropdownBtn}
					onClick={toggleClass}
				>
					<div className="dropdown-menu" ref={dropdown}>
						<div className="dropdown-menu__details">
							<img
								className="avatar"
								src={user.avatar}
								alt="avatar"
							></img>
							<div>
								<div className="name">
									{user.first_name} {user.last_name}
								</div>
								<div className="email">{user.email}</div>
							</div>
						</div>
						<div className="dropdown-menu__links-wrapper">
							<Link to="/account" className="dropdown-menu__link">
								Account
							</Link>
						</div>

						<button
							onClick={() => logout(CSRF_TOKEN)}
							className="dropdown-menu__btn"
						>
							Выйти
						</button>
					</div>
				</div>
			</div>
			<div className="todo-app" key={1}>
				<NavBarBurger
					navBarState={navBarState}
					toggleNavBarState={toggleNavBarState}
					todoListName={todoListName}
				/>
				<NavBar
					key={0}
					expiredTodos={expiredTodos}
					weekTodos={weekTodos}
					tommorowTodos={tommorowTodos}
					todayTodos={todayTodos}
					todos={todos}
					navBarState={navBarState}
				/>

				<Todos
					key={1}
					addTodo={addTodo}
					expiredTodos={expiredTodos}
					successAddedTodo={successAddedTodo}
					completedTodos={completedTodos}
					notes={notes}
					addNote={addNote}
					setBody={setBody}
					todoList={todoList}
					todoListName={todoListName}
					user={user}
					successReceiveNote={successReceiveNote}
					setNoteBody={setNoteBody}
					deleteNote={deleteNote}
					completeTodo={completeTodo}
					restoreTodo={restoreTodo}
					deleteTodo={deleteTodo}
					navBarState={navBarState}
				/>
			</div>
		</>
	);
}

function Todos({
	addTodo,
	expiredTodos,
	successAddedTodo,
	notes,
	completedTodos,
	setBody,
	todoList,
	todoListName,
	user,
	addNote,
	successReceiveNote,
	setNoteBody,
	deleteNote,
	completeTodo,
	restoreTodo,
	deleteTodo,
	navBarState,
}) {
	const { list } = useParams();

	const todoDetailsInitialState = {
		isActive: false,
		todo: { id: -1 },
		earlyTodo: { id: -1 },
		notes: [{ id: -1, body: "" }],
	};

	useEffect(() => {
		if (successReceiveNote && successAddedTodo) {
			const todoNotes = notes
				.filter((note) => note.todo_id === todoDetails.todo.id)
				.map((note) => {
					return { ...note };
				});
			dispatchTodoDetails({
				type: UPDATE_WITHOUT_SET_ACTIVE,
				payload: { todo: todoDetails.todo, notes: todoNotes },
			});
		}
	}, [successReceiveNote, successAddedTodo]);

	const TOGGLE_IS_ACTIVE = "TOGGLE_IS_ACTIVE";
	const REPLACEMENT_TODO = "REPLACEMENT_TODO";
	const UPDATE_TODO = "UPDATE_TODO";
	const UPDATE_WITHOUT_SET_ACTIVE = "UPDATE_WITHOUT_SET_ACTIVE";
	const RESET_TODO_DETAILS = "RESET_TODO_DETAILS";

	function todoDetailsReducer(state, action) {
		switch (action.type) {
			case TOGGLE_IS_ACTIVE:
				return {
					...state,
					isActive: !state.isActive,
				};
			case REPLACEMENT_TODO:
				return {
					isActive: true,
					todo: { ...action.payload.todo },
					earlyTodo: { ...action.payload.todo },
					notes: [...action.payload.notes],
				};
			case UPDATE_WITHOUT_SET_ACTIVE:
				return {
					...state,
					todo: { ...action.payload.todo },
					earlyTodo: { ...action.payload.todo },
					notes: [...action.payload.notes],
				};
			case UPDATE_TODO:
				return {
					...state,
					todo: { ...state.todo, body: action.payload.body },
					// notes: state.notes,
				};
			case RESET_TODO_DETAILS:
				return {
					isActive: todoDetailsInitialState.isActive,
					todo: { ...todoDetailsInitialState.todo },
					earlyTodo: { ...todoDetailsInitialState.earlyTodo },
					notes: [...todoDetailsInitialState.notes],
				};
			default:
				return state;
		}
	}

	const [todoDetails, dispatchTodoDetails] = useReducer(
		todoDetailsReducer,
		todoDetailsInitialState,
		undefined
	);

	function taskDetailsHandler(todo) {
		if (todo.id !== todoDetails.todo.id) {
			const todoNotes = notes
				.filter((note) => note.todo_id === todo.id)
				.map((note) => {
					return { ...note };
				});
			dispatchTodoDetails({
				type: REPLACEMENT_TODO,
				payload: { todo, notes: todoNotes },
			});
		} else dispatchTodoDetails({ type: TOGGLE_IS_ACTIVE });
	}

	function updateTodo() {
		if (todoDetails.earlyTodo.body === todoDetails.todo.body) {
			return;
		} else {
			setBody(
				{ id: todoDetails.todo.id, body: todoDetails.todo.body },
				CSRF_TOKEN
			);
		}
	}

	function updateTodoHandler(e) {
		if (e.target.value) {
			dispatchTodoDetails({
				type: UPDATE_TODO,
				payload: { body: e.target.value },
			});
		}
	}

	function cancelTodoUpdate() {
		dispatchTodoDetails({
			type: UPDATE_TODO,
			payload: { body: todoDetails.earlyTodo.body },
		});
	}

	function closeTodoDetails() {
		dispatchTodoDetails({ type: TOGGLE_IS_ACTIVE });
	}

	function addNoteRequest(body) {
		addNote({ body, todo_id: todoDetails.todo.id }, CSRF_TOKEN);
	}

	function completeTodoRequest() {
		completeTodo({ id: todoDetails.todo.id }, CSRF_TOKEN);
		dispatchTodoDetails({ type: RESET_TODO_DETAILS });
	}

	function restoreTodoRequest() {
		restoreTodo({ id: todoDetails.todo.id }, CSRF_TOKEN);
		dispatchTodoDetails({ type: RESET_TODO_DETAILS });
	}

	function resetTodoDetails() {
		dispatchTodoDetails({ type: RESET_TODO_DETAILS });
	}

	function deleteTodoRequest() {
		deleteTodo({ id: todoDetails.todo.id }, CSRF_TOKEN);
	}

	return (
		<main
			className={
				navBarState
					? "todo-main todo-main_state_with-nav"
					: "todo-main todo-main_state_without-nav"
			}
			key={0}
		>
			<div className="todo-main__container" key={0}>
				<div className="status-links">
					<div></div>
					<NavLink
						exact
						to={`/app/${list}`}
						isActive={(match, location) => {
							const listLength = list.length;
							const slicedLocation = parseInt(
								location.pathname.slice(6 + listLength)
							);

							if (location.pathname === `/app/${list}`)
								return true;
							if (
								!isNaN(slicedLocation) &&
								location.pathname ===
									`/app/${list}/${slicedLocation}`
							)
								return true;
						}}
						className="status-links__link"
						activeClassName="status-links__link_active"
					>
						Незавершённые
					</NavLink>
					<NavLink
						exact
						to={`/app/${list}/completed`}
						isActive={(match, location) => {
							const listLength = list.length;
							const slicedLocation = parseInt(
								location.pathname.slice(16 + listLength)
							);

							if (location.pathname === `/app/${list}/completed`)
								return true;
							if (
								!isNaN(slicedLocation) &&
								location.pathname ===
									`/app/${list}/completed/${slicedLocation}`
							)
								return true;
						}}
						className="status-links__link"
						activeClassName="status-links__link_active"
					>
						Завершённые
					</NavLink>
				</div>

				<Route exact path={`/app/${list}`}>
					{todoDetails.isActive ? (
						<div className="toolbar">
							<button
								className="toolbar__button toolbar__button_purpose_complete"
								title="Завершить задачу"
								onClick={completeTodoRequest}
							></button>
							<button
								className="toolbar__button toolbar__button_purpose_delete"
								title="Удалить задачу"
								onClick={deleteTodoRequest}
							></button>
						</div>
					) : (
						<div className="toolbar"></div>
					)}
					<AddTodoForm
						csrfToken={CSRF_TOKEN}
						addTodo={addTodo}
						successAddedTodo={successAddedTodo}
					/>
					<div className="todo-list">
						{/* {list ? ( */}
						<TodoElement
							list={list}
							expiredTodos={expiredTodos}
							todoList={todoList}
							willEndAtStyle={"todo__will-end-at"}
							taskDetailsHandler={taskDetailsHandler}
							todoDetails={todoDetails}
							resetTodoDetails={resetTodoDetails}
						/>
						{/* ) : null} */}
					</div>
				</Route>
				<Route exact path={`/app/${list}/completed`}>
					{todoDetails.isActive ? (
						<div className="toolbar">
							<button
								className="toolbar__button toolbar__button_purpose_restore"
								title="Восстановить"
								onClick={restoreTodoRequest}
							></button>
							<button
								className="toolbar__button toolbar__button_purpose_delete"
								title="Удалить задачу"
								onClick={deleteTodoRequest}
							></button>
						</div>
					) : (
						<div className="toolbar"></div>
					)}
					<div className="empty-block"></div>
					<div className="todo-list">
						<CompletedTodoElement
							todoList={completedTodos}
							taskDetailsHandler={taskDetailsHandler}
							todoDetails={todoDetails}
							resetTodoDetails={resetTodoDetails}
						/>
					</div>
				</Route>
			</div>
			<div className="additional-info" key={1}>
				<h4>{todoListName}</h4>
				<div className="additional-info__wrapper">
					<div className="counter">
						<div className="tasks">{todoList.length}</div>
						<span>задач(и)</span>
					</div>
					<div className="counter">
						<div className="expired">{expiredTodos.length}</div>
						<span>просрочено</span>
					</div>
					<div className="counter">
						<div className="completed">{completedTodos.length}</div>
						<span className="completed">завершено</span>
					</div>
				</div>
			</div>
			<div
				key={2}
				className={
					todoDetails.isActive
						? "task-details task-details_opened"
						: "task-details"
				}
			>
				<TodoEdit
					todoDetails={todoDetails}
					updateTodo={updateTodo}
					closeTodoDetails={closeTodoDetails}
					updateTodoHandler={updateTodoHandler}
					cancelTodoUpdate={cancelTodoUpdate}
				/>
				<div className="task-details__notes-wrapper">
					<h3>Заметки</h3>
					<AddNote
						avatar={user.avatar}
						addNoteRequest={addNoteRequest}
						successReceiveNote={successReceiveNote}
					/>
					<div className="task-details__notes">
						{todoDetails.isActive
							? todoDetails.notes.map((note) => (
									<Note
										note={note}
										avatar={user.avatar}
										key={note.id}
										setNoteBody={setNoteBody}
										deleteNote={deleteNote}
										CSRF_TOKEN={CSRF_TOKEN}
									/>
							  ))
							: null}
					</div>
				</div>
			</div>
		</main>
	);
}
