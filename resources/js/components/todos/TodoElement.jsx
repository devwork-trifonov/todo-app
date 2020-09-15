import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
// import moment from "moment";
// window.moment = require("moment");
const moment = window.moment;

export function TodoElement({
	todoList,
	willEndAtStyle,
	taskDetailsHandler,
	todoDetails,
	resetTodoDetails,
	list,
	expiredTodos,
}) {
	const { url } = useRouteMatch();
	useEffect(() => {
		resetTodoDetails();
	}, [url]);
	return list.startsWith("tommorow")
		? todoList.map((todo) => {
				return (
					<div
						className={
							todo.id === todoDetails.todo.id &&
							todoDetails.isActive
								? "todo todo_selected"
								: "todo"
						}
						key={todo.id}
						onClick={() => taskDetailsHandler({ ...todo })}
					>
						<div className="todo__wrapper">
							<span className="todo__checkbox" />
							<div className="todo__body">{todo.body}</div>
						</div>
						{todo.will_end_at ? (
							<div className={willEndAtStyle}>
								{moment(todo.will_end_at).format("DD MMM")}
							</div>
						) : null}
					</div>
				);
		  })
		: [
				expiredTodos.map((todo) => {
					return (
						<div
							className={
								todo.id === todoDetails.todo.id &&
								todoDetails.isActive
									? "todo todo_selected"
									: "todo"
							}
							key={todo.id}
							onClick={() => taskDetailsHandler({ ...todo })}
						>
							<div className="todo__wrapper">
								<span className="todo__checkbox" />
								<div className="todo__body todo__body_expired">
									{todo.body}
								</div>
							</div>
							{todo.will_end_at ? (
								<div className="todo__will-end-at_expired">
									{moment(todo.will_end_at).format("DD MMM")}
								</div>
							) : null}
						</div>
					);
				}),
				todoList.map((todo) => {
					return (
						<div
							className={
								todo.id === todoDetails.todo.id &&
								todoDetails.isActive
									? "todo todo_selected"
									: "todo"
							}
							key={todo.id}
							onClick={() => taskDetailsHandler({ ...todo })}
						>
							<div className="todo__wrapper">
								<span className="todo__checkbox" />
								<div className="todo__body">{todo.body}</div>
							</div>
							{todo.will_end_at ? (
								<div className="todo__will-end-at">
									{moment(todo.will_end_at).format("DD MMM")}
								</div>
							) : null}
						</div>
					);
				}),
		  ];
}

export function CompletedTodoElement({
	todoList,
	taskDetailsHandler,
	todoDetails,
	resetTodoDetails,
}) {
	const { url } = useRouteMatch();
	useEffect(() => resetTodoDetails(), [url]);
	return todoList.map((todo) => {
		return (
			<div
				className={
					todo.id === todoDetails.todo.id && todoDetails.isActive
						? "todo todo_selected todo_completed"
						: "todo todo_completed"
				}
				key={todo.id}
				onClick={() => taskDetailsHandler({ ...todo })}
			>
				<div className="todo__wrapper">
					<span className="todo__checkbox" />
					<div className="todo__body">{todo.body}</div>
				</div>
				{todo.completed_at ? (
					<div className="todo__completed-at">
						{moment(todo.completed_at).format("DD MMM")}
					</div>
				) : null}
			</div>
		);
	});
}
