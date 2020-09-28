import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export function DatePickerModal({
	dateListStyle,
	days,
	startDate,
	setStartDate,
	dateList,
	className,
	dateListPickHandle,
	datepickerHandle,
}) {
	const {
		today,
		tomorrow,
		firstDayAfterTomorrow,
		secondDayAfterTomorrow,
		thirdDayAfterTomorrow,
		oneWeek,
	} = days;

	return (
		<div className={className} style={dateListStyle} ref={dateList}>
			<div
				className="date-list__element"
				date="today"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">Сегодня</div>
				<div className="date">{today.format("DD MMM")}</div>
			</div>
			<div
				className="date-list__element"
				date="tomorrow"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">Завтра</div>
				<div className="date">{tomorrow.format("DD MMM")}</div>
			</div>
			<div
				className="date-list__element"
				date="firstDayAfterTomorrow"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">
					{firstDayAfterTomorrow.format("dddd")}
				</div>
				<div className="date">
					{firstDayAfterTomorrow.format("DD MMM")}
				</div>
			</div>
			<div
				className="date-list__element"
				date="secondDayAfterTomorrow"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">
					{secondDayAfterTomorrow.format("dddd")}
				</div>
				<div className="date">
					{secondDayAfterTomorrow.format("DD MMM")}
				</div>
			</div>
			<div
				className="date-list__element"
				date="thirdDayAfterTomorrow"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">
					{thirdDayAfterTomorrow.format("dddd")}
				</div>
				<div className="date">
					{thirdDayAfterTomorrow.format("DD MMM")}
				</div>
			</div>
			<div
				className="date-list__element"
				date="oneWeek"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">
					{oneWeek.format("[1 неделя]")}
				</div>
				<div className="date">{oneWeek.format("DD MMM")}</div>
			</div>
			<div
				className="date-list__element"
				date="noLimit"
				onClick={dateListPickHandle}
			>
				<div className="day-of-week">Нет срока</div>
				<div className="date">не указано</div>
			</div>
			<div className="date-list__element">
				<div className="day-of-week">Календарь</div>
				<div className="date">&#9658;</div>
				<div className="datepicker">
					<DatePicker
						selected={startDate}
						onChange={(date) => {
							setStartDate(date);
						}}
						locale="ru"
						inline={true}
						shouldCloseOnSelect={false}
					>
						<div className="datepicker__submit">
							<button
								className="btn btn_uppercase"
								onClick={datepickerHandle}
							>
								ок
							</button>
						</div>
					</DatePicker>
				</div>
				<div className="under-datepicker"></div>
				<div className="over-datepicker"></div>
			</div>
		</div>
	);
}
