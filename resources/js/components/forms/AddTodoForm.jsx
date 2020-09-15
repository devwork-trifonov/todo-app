import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useReducer,
} from "react";
import { DatePickerModal } from "../datepicker/DatePickerModal";
const moment = window.moment;
moment.locale("ru");

export default function AddTodoForm({ csrfToken, addTodo, successAddedTodo }) {
	const [dueDate, setDueDate] = useState(null);
	const [taskStartDate, setTaskStartDate] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [pickedDate, setPickedDate] = useState(null);
	const [dateListInitiator, setDateListInitiator] = useState("");
	const [dateListStyle, setDateListStyle] = useState({});
	const [formState, setFormState] = useState(0);

	const textInputRef = useRef();
	const dateList = useRef();
	const formRef = useRef();

	const inputFieldsInitialState = {
		inputFields: [
			{
				type: "text",
				inputIndex: 0,
				indexInArray: 0,
				id: generateId(),
				value: "",
				top: 0,
				left: 0,
			},
		],
		lastInput: {
			inputIndex: 0,
			indexInArray: 0,
			value: "",
			top: 0,
			left: 0,
		},
	};
	const days = {
		today: moment({ hour: 0, minute: 0, seconds: 0 }),
		tomorrow: moment({ hour: 0, minute: 0, seconds: 0 }).add(1, "days"),
		firstDayAfterTomorrow: moment({ hour: 0, minute: 0, seconds: 0 }).add(
			2,
			"days"
		),
		secondDayAfterTomorrow: moment({ hour: 0, minute: 0, seconds: 0 }).add(
			3,
			"days"
		),
		thirdDayAfterTomorrow: moment({ hour: 0, minute: 0, seconds: 0 }).add(
			4,
			"days"
		),
		oneWeek: moment({ hour: 0, minute: 0, seconds: 0 }).add(7, "days"),
		noLimit: null,
	};
	const formStateMap = {
		INPUT_FOCUSED: 1,
		HAS_TEXT: 2,
		DATEPICKER: 4,
		DUE_DATE: 8,
		START_DATE: 16,
	};
	const textInputMaxWidth = document.body.clientWidth * 0.5;

	function dispatchFormState(action, value) {
		switch (action) {
			case "OR":
				setFormState((prev) => prev | value);
				break;
			case "XOR":
				setFormState((prev) => prev ^ value);
				break;
			default:
				break;
		}
	}

	const inputFieldsReducer = (state, action) => {
		switch (action.type) {
			case "addInputField":
				return {
					...state,
					inputFields: [
						...state.inputFields,
						{
							type: "text",
							inputIndex: state.lastInput.inputIndex + 1,
							indexInArray: state.inputFields.length,
							id: generateId(),
							value: "",
						},
					],
					lastInput: {
						inputIndex: state.lastInput.inputIndex + 1,
						indexInArray: state.inputFields.length,
					},
				};
			case "addDateField":
				if (
					state.inputFields[state.inputFields.length - 1].type ===
						"text" &&
					!state.inputFields[state.inputFields.length - 1].value
				) {
					const newArray = state.inputFields.slice(
						0,
						state.inputFields.length - 1
					);
					return {
						...state,
						inputFields: [
							...newArray,
							{
								type: action.payload.type,
								text: action.payload.text,
								indexInArray: state.inputFields.length - 1,
								id: generateId(),
							},
							{
								type: "text",
								inputIndex: state.lastInput.inputIndex,
								indexInArray: state.inputFields.length,
								id: generateId(),
								value: "",
								top: 0,
								left: 0,
							},
						],
						lastInput: {
							inputIndex: state.lastInput.inputIndex,
							indexInArray: state.inputFields.length,
							top: state.lastInput.top,
							left: textInputMaxWidth / 7,
						},
					};
				} else {
					return {
						...state,
						inputFields: [
							...state.inputFields,
							{
								type: action.payload.type,
								text: action.payload.text,
								indexInArray: state.inputFields.length,
								id: generateId(),
							},
							{
								type: "text",
								inputIndex: state.lastInput.inputIndex + 1,
								indexInArray: state.inputFields.length + 1,
								id: generateId(),
								value: "",
								top: 0,
								left: 0,
							},
						],
						lastInput: {
							inputIndex: state.lastInput.inputIndex + 1,
							indexInArray: state.inputFields.length + 1,
							top: state.lastInput.top,
							left: textInputMaxWidth / 7,
						},
					};
				}
			case "valueInput":
				if (
					action.payload.indexInArray === state.lastInput.indexInArray
				) {
					return {
						...state,
						inputFields: state.inputFields.map((field, index) => {
							if (index !== action.payload.indexInArray) {
								return { ...field };
							}
							// field.value = action.payload.value;
							// field.top = action.payload.top;
							// field.left = action.payload.left;
							return Object.assign({}, field, {
								value: action.payload.value,
								top: action.payload.top,
								left: action.payload.left,
							});
						}),
						lastInput: {
							...state.lastInput,
							value: action.payload.value,
							top: action.payload.top,
							left: action.payload.left,
						},
					};
				} else {
					return {
						...state,
						inputFields: state.inputFields.map((field, index) => {
							if (index !== action.payload.indexInArray) {
								return { ...field };
							}
							// field.value = action.payload.value;
							// field.top = action.payload.top;
							// field.left = action.payload.left;
							return Object.assign({}, field, {
								value: action.payload.value,
								top: action.payload.top,
								left: action.payload.left,
							});
						}),
					};
				}
			case "delete":
				const arrayWithoutTargetField = state.inputFields
					.map((field) => {
						return { ...field };
					})
					.filter(
						(field) =>
							field.indexInArray !== action.payload.indexInArray
					)
					.map((field) => {
						if (field.indexInArray > action.payload.indexInArray) {
							field.indexInArray -= 1;
							return field;
						} else {
							return field;
						}
					});
				let indexForMerge;
				let mergedArray = [];
				for (let i = 1; i < arrayWithoutTargetField.length; i++) {
					if (
						arrayWithoutTargetField[i].type === "text" &&
						arrayWithoutTargetField[i - 1].type === "text"
					) {
						indexForMerge = i - 1;
						let textBuffer =
							arrayWithoutTargetField[i - 1].value +
							arrayWithoutTargetField[i].value;
						mergedArray.push({
							type: "text",
							inputIndex:
								arrayWithoutTargetField[i - 1].inputIndex,
							indexInArray: i - 1,
							id: generateId(),
							value: textBuffer,
							top: 0,
							left: 0,
						});
						i++;
					} else if (indexForMerge) {
						mergedArray.push(arrayWithoutTargetField[i]);
					} else if (
						!indexForMerge &&
						i === arrayWithoutTargetField.length - 1
					) {
						mergedArray.push(arrayWithoutTargetField[i - 1]);
						mergedArray.push(arrayWithoutTargetField[i]);
					} else {
						mergedArray.push(arrayWithoutTargetField[i - 1]);
					}
				}
				const updatedMergedArray = mergedArray.map((field) => {
					if (field.indexInArray > indexForMerge) {
						field.indexInArray -= 1;
						return field;
					} else {
						return field;
					}
				});
				return {
					...state,
					inputFields: updatedMergedArray,
					lastInput: {
						...updatedMergedArray[updatedMergedArray.length - 1],
						top: state.lastInput.top,
						left: state.lastInput.left,
					},
				};
			case "reset":
				return inputFieldsInitialState;
			default:
				return state;
		}
	};

	const [inputFields, dispatchInputFields] = useReducer(
		inputFieldsReducer,
		inputFieldsInitialState,
		undefined
	);

	useEffect(() => {
		if (successAddedTodo) {
			resetFormState();
		}
	}, [successAddedTodo]);

	useEffect(() => {
		return () => document.removeEventListener("click", dateListHandle);
	}, []);

	useEffect(() => {
		return () => document.removeEventListener("click", formClickHandler);
	}, []);

	useEffect(() => {
		if (pickedDate) dateFieldHandle();
	}, [pickedDate]);

	function generateId() {
		return `f${(~~(Math.random() * 1e8)).toString(16)}`;
	}

	function deleteField(indexInArray, type) {
		dispatchInputFields({ type: "delete", payload: { indexInArray } });
		if (type === "dueDate") {
			dispatchFormState("XOR", formStateMap.DUE_DATE);
			setDueDate(null);
		} else {
			dispatchFormState("XOR", formStateMap.START_DATE);
			setTaskStartDate(null);
		}
	}

	const dateFieldHandle = useCallback(
		function () {
			const text = moment(pickedDate).format("DD MMM");
			const type = dateListInitiator;
			switch (dateListInitiator) {
				case "dueDate":
					setDueDate(pickedDate);
					dispatchInputFields({
						type: "addDateField",
						payload: { type, text },
					});
					dispatchFormState("OR", formStateMap.DUE_DATE);
					break;
				case "startDate":
					setTaskStartDate(pickedDate);
					dispatchInputFields({
						type: "addDateField",
						payload: { type, text },
					});
					dispatchFormState("OR", formStateMap.START_DATE);
					break;
				default:
					break;
			}
		},
		[
			pickedDate,
			formStateMap.START_DATE,
			dateListInitiator,
			formStateMap.DUE_DATE,
		]
	);

	function resetFormState() {
		dispatchInputFields({ type: "reset" });
		setDueDate(null);
		setStartDate(new Date());
		setTaskStartDate(null);
		setPickedDate(null);
		setFormState(0);
	}

	const localToUtcZero = (date) => {
		if (date === null) return null;
		return moment(date).utc().format("YYYY-MM-DD HH:mm:ss").trim();
	};

	function requestTodo() {
		let body = inputFields.inputFields
			.filter((field) => field.type === "text" && field.value)
			.map((field) => field.value)
			.join(" ");
		let data = {
			body,
			begin_at: localToUtcZero(taskStartDate),
			will_end_at: localToUtcZero(dueDate),
		};
		addTodo(data, csrfToken);
	}

	function dateSelectHandle(initiator) {
		setDateListInitiator(initiator);
		dispatchFormState("OR", formStateMap.DATEPICKER);
		document.addEventListener("click", dateListHandle);
		if (inputFields.lastInput.left < textInputMaxWidth) {
			setDateListStyle({
				top: inputFields.lastInput.top,
				left: inputFields.lastInput.left,
			});
		} else {
			setDateListStyle({
				top: inputFields.lastInput.top,
				left: textInputMaxWidth,
			});
		}
	}

	function dateListPickHandle(e) {
		const date = e.currentTarget.getAttribute("date");
		setPickedDate(days[date]);
		dispatchFormState("XOR", formStateMap.DATEPICKER);
		document.removeEventListener("click", dateListHandle);
	}

	function datepickerHandle() {
		setPickedDate(startDate);
		dispatchFormState("XOR", formStateMap.DATEPICKER);
		document.removeEventListener("click", dateListHandle);
	}

	let dateListHandle = useCallback(
		function (event) {
			if (dateList.current.contains(event.target)) {
				return;
			} else {
				dispatchFormState("XOR", formStateMap.DATEPICKER);
				document.removeEventListener("click", dateListHandle);
			}
		},
		[formStateMap.DATEPICKER]
	);

	let formClickHandler = useCallback(
		function (event) {
			if (formRef.current.contains(event.target)) {
				return;
			} else {
				dispatchFormState("XOR", formStateMap.INPUT_FOCUSED);
				document.removeEventListener("click", formClickHandler);
			}
		},
		[formStateMap.INPUT_FOCUSED]
	);

	function setFormStateInputFocuded() {
		if (!(formState & formStateMap.INPUT_FOCUSED)) {
			dispatchFormState("OR", formStateMap.INPUT_FOCUSED);
			document.addEventListener("click", formClickHandler);
		}
	}

	function textInputHandleChange(
		inputIndex,
		indexInArray,
		value,
		clientRect,
		top,
		left
	) {
		dispatchInputFields({
			type: "valueInput",
			payload: {
				value,
				indexInArray,
				top,
				left,
			},
		});

		if (
			(indexInArray > 0 || value.length) &&
			!(formState & formStateMap.HAS_TEXT)
		) {
			dispatchFormState("OR", formStateMap.HAS_TEXT);
		} else if (!indexInArray && !value.length) {
			dispatchFormState("XOR", formStateMap.HAS_TEXT);
		}
	}

	return (
		<div className="add-todo-form" ref={formRef}>
			<InputField
				key={2}
				textInputHandleChange={textInputHandleChange}
				inputFields={inputFields.inputFields}
				textInputRef={textInputRef}
				setFormStateInputFocuded={setFormStateInputFocuded}
				textInputMaxWidth={textInputMaxWidth}
				deleteField={deleteField}
				className={
					formState & formStateMap.INPUT_FOCUSED
						? "add-todo-form__text-input add-todo-form__text-input_focused"
						: "add-todo-form__text-input"
				}
			/>

			<DatePickerModal
				key={3}
				dateListStyle={dateListStyle}
				days={days}
				setPickedDate={setPickedDate}
				startDate={startDate}
				setStartDate={setStartDate}
				dateList={dateList}
				dateListPickHandle={dateListPickHandle}
				datepickerHandle={datepickerHandle}
				className={
					formState & formStateMap.DATEPICKER
						? "date-list_opened"
						: "date-list"
				}
			/>

			<div
				className={
					formState & formStateMap.INPUT_FOCUSED
						? "add-todo-form__controls"
						: "add-todo-form__controls add-todo-form__controls_closed"
				}
				key={4}
			>
				<div
					className={
						formState & formStateMap.HAS_TEXT
							? "options"
							: "options_closed"
					}
				>
					<button
						onClick={() => {
							dateSelectHandle("dueDate");
						}}
						disabled={Boolean(
							formState & formStateMap.DATEPICKER ||
								formState & formStateMap.DUE_DATE
						)}
						className="due-date"
						title="Указать дату выполнения"
					></button>
					<button
						onClick={() => dateSelectHandle("startDate")}
						disabled={Boolean(
							formState & formStateMap.DATEPICKER ||
								formState & formStateMap.START_DATE
						)}
						className="start-date"
						title="Указать начальную дату задачи"
					></button>
				</div>
				<button
					className="btn"
					disabled={!Boolean(formState & formStateMap.HAS_TEXT)}
					onClick={requestTodo}
				>
					Добавить задачу
				</button>
			</div>
		</div>
	);
}

function TextInputField({
	textInputRef,
	textInputHandleChange,
	index,
	text,
	indexInArray,
	setFormStateInputFocuded,
	inputLength,
}) {
	const textBuffer = useRef();
	const inputRef = useRef();

	return (
		<>
			<input
				ref={inputRef}
				index={index}
				type="text"
				value={text}
				placeholder={indexInArray ? null : "Добавить задачу..."}
				style={
					indexInArray < inputLength
						? { width: textBuffer.current.clientWidth + 8 }
						: { width: "100%" }
				}
				onChange={(e) => {
					textInputHandleChange(
						index,
						indexInArray,
						e.target.value,
						e.target.getBoundingClientRect(),
						inputRef.current.offsetHeight + e.target.offsetTop,
						e.target.offsetLeft + textBuffer.current.clientWidth + 8
					);
				}}
				onFocus={(e) => {
					setFormStateInputFocuded();
				}}
			></input>
			<div
				ref={textBuffer}
				style={{
					whiteSpace: "nowrap",
					display: "inline-block",
					backgroundColor: "green",
					position: "absolute",
					visibility: "hidden",
					top: -100,
				}}
			>
				{text}
			</div>
		</>
	);
}

function PickedDateOrTag({ text, symbol, deleteField, indexInArray, type }) {
	return (
		<div className="picked-date">
			<div className="picked-date__date">
				{symbol} {text}
			</div>
			<button
				className="picked-date__revoke"
				onClick={() => deleteField(indexInArray, type)}
			>
				&#10006;
			</button>
		</div>
	);
}

function InputField({
	textInputHandleChange,
	inputFields,
	textInputRef,
	setFormStateInputFocuded,
	textInputMaxWidth,
	deleteField,
	className,
}) {
	return (
		<div
			className={className}
			ref={textInputRef}
			// style={{ maxWidth: textInputMaxWidth }}
			onMouseDown={setFormStateInputFocuded}
		>
			{inputFields.map((field, index, arr) => {
				if (field.type === "text") {
					return (
						<TextInputField
							textInputRef={textInputRef}
							textInputHandleChange={textInputHandleChange}
							key={index}
							index={field.inputIndex}
							text={field.value}
							indexInArray={field.indexInArray}
							setFormStateInputFocuded={setFormStateInputFocuded}
							inputLength={arr.length - 1}
						/>
					);
				} else if (field.type === "dueDate") {
					return (
						<PickedDateOrTag
							id={field.id}
							text={field.text}
							symbol={"^"}
							key={index}
							deleteField={deleteField}
							indexInArray={field.indexInArray}
							type={field.type}
						/>
					);
				} else if (field.type === "startDate") {
					return (
						<PickedDateOrTag
							id={field.id}
							text={field.text}
							symbol={"~"}
							key={index}
							deleteField={deleteField}
							indexInArray={field.indexInArray}
							type={field.type}
						/>
					);
				}
			})}
		</div>
	);
}
