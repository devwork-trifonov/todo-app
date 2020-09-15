import React, { useEffect, useState, useRef } from "react";
// import moment from "moment";
// window.moment = require("moment");
const moment = window.moment;

export function TodoEdit({
	todoDetails,
	updateTodo,
	closeTodoDetails,
	updateTodoHandler,
	cancelTodoUpdate,
}) {
	const [isFocusedInput, setIsFocusedInput] = useState(false);

	const input = useRef();
	const closeTodoDetailsButton = useRef();
	const todoWrapper = useRef();

	useEffect(() => {
		return document.removeEventListener("click", focusedInputClickHandler);
	}, []);

	const focusedInputClickHandler = (e) => {
		if (
			!todoWrapper.current.contains(e.target) &&
			!input.current.contains(e.target) &&
			!closeTodoDetailsButton.current.contains(e.target)
		) {
			cancelTodoUpdate();
			document.removeEventListener("click", focusedInputClickHandler);
		} else if (input.current.contains(e.target)) {
			return;
		} else {
			document.removeEventListener("click", focusedInputClickHandler);
		}
	};

	function todoWrapperClickHandler(e) {
		if (
			!input.current.contains(e.target) &&
			!closeTodoDetailsButton.current.contains(e.target)
		) {
			updateTodo();
		}
	}

	function buttonClickHandler() {
		cancelTodoUpdate();
		closeTodoDetails();
		document.removeEventListener("click", focusedInputClickHandler);
	}

	function onInputFocus() {
		if (!isFocusedInput) {
			document.addEventListener("click", focusedInputClickHandler);
		}
	}

	return (
		<div
			className="task-details__todo-wrapper"
			ref={todoWrapper}
			onClick={todoWrapperClickHandler}
		>
			<div className="task-details__button-wrapper">
				<button
					ref={closeTodoDetailsButton}
					onClick={buttonClickHandler}
				>
					закрыть &nbsp;х
				</button>
			</div>
			<div className="task-details__todo">
				<div className="input-wrapper">
					<input
						ref={input}
						key={todoDetails.todo.id}
						type="text"
						value={todoDetails.todo.body}
						onChange={updateTodoHandler}
						onKeyDown={(e) => {
							if (e.keyCode === 13) {
								updateTodo();
							}
						}}
						onFocus={() => {
							onInputFocus();
							setIsFocusedInput(true);
						}}
						onBlur={() => {
							setIsFocusedInput(false);
						}}
					/>
				</div>
				<div className="edit-fields">
					{/* begin_at */}
					{todoDetails.todo.begin_at ? (
						<div className="date">
							<div className={"heading"}>начало</div>{" "}
							<div className={"value"}>
								{moment(todoDetails.todo.begin_at).format(
									"dd, DD MMM YY"
								)}
							</div>
						</div>
					) : null}
					{/* will_end_at */}
					{todoDetails.todo.will_end_at ? (
						<div className="date">
							<div className={"heading"}>срок</div>{" "}
							<div className={"value"}>
								{moment(todoDetails.todo.will_end_at).format(
									"dd, DD MMM YY"
								)}
							</div>
						</div>
					) : (
						<div className="date">
							<div className={"heading"}>срок</div>{" "}
							<div className={"value"}>никогда</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
