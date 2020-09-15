import React, { useEffect, useState, useRef } from "react";

export function AddNote({ avatar, addNoteRequest, successReceiveNote }) {
	const addNoteInput = useRef();
	const [isFocusedAddNotes, setIsFocusedAddNotes] = useState(false);
	const [addNoteInputHeight, setAddNoteInputHeight] = useState(33);
	const [addNoteInputMinHeight, setAddNoteInputMinHeight] = useState(32);
	const [addNoteInputText, setAddNoteInputText] = useState("");

	useEffect(() => {
		if (successReceiveNote) addNoteInputBluring();
	}, [successReceiveNote]);

	function addNoteInputClickHandler() {
		setIsFocusedAddNotes(true);
		if (addNoteInputHeight === 33) {
			setAddNoteInputHeight(50);
			setAddNoteInputMinHeight(49);
		}
	}

	function addNoteInputBluring() {
		setIsFocusedAddNotes(false);
		addNoteInput.current.textContent = "";
		setAddNoteInputHeight(33);
		setAddNoteInputMinHeight(32);
		setAddNoteInputText("");
	}

	function addNoteInputHandler(e, id) {
		setAddNoteInputText(e.target.innerText.trim());
		setAddNoteInputHeight(e.target.clientHeight);
	}

	return (
		<div className="add-notes">
			<div
				style={{
					height: addNoteInputHeight,
				}}
				className={
					!isFocusedAddNotes
						? "add-notes__text-input-wrapper"
						: "add-notes__text-input-wrapper add-notes__text-input-wrapper_focused"
				}
			>
				<div
					style={
						isFocusedAddNotes
							? { display: "none" }
							: { display: "block" }
					}
					className="add-notes__placeholder"
					onClick={() => {
						addNoteInputClickHandler();
						addNoteInput.current.focus();
					}}
				>
					Добавить заметку...
				</div>
				<div className="add-notes__avatar-wrapper">
					<img src={avatar} alt="user" className="avatar" />
				</div>
				<div
					ref={addNoteInput}
					className="text-input"
					onInput={(e) => addNoteInputHandler(e, -1)}
					onClick={addNoteInputClickHandler}
					contentEditable={true}
					style={{ minHeight: addNoteInputMinHeight }}
				></div>
			</div>
			{isFocusedAddNotes ? (
				<div className="add-notes__buttons-wrapper">
					<button
						disabled={!addNoteInputText && successReceiveNote}
						className="btn"
						onClick={() => addNoteRequest(addNoteInputText)}
					>
						Сохранить
					</button>
					<button
						disabled={!successReceiveNote}
						className="btn btn_style_blond"
						onClick={addNoteInputBluring}
					>
						Отмена
					</button>
				</div>
			) : null}
		</div>
	);
}
