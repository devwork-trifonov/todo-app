import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="rts__footer static-footer">
			<div className="container static-footer__wrapper">
				<div className="static-footer__logo"></div>
				{/* <div className="static-footer__links-wrapper"> */}
				<div className="static-footer__links">
					<h4>Компания</h4>
					<ul>
						<li>О проекте</li>
						<li>Задания</li>
						<li>Пресса</li>
						<li>Блог</li>
					</ul>
				</div>
				<div className="static-footer__links">
					<h4>Продукт</h4>
					<ul>
						<li>
							<Link to="/tour">Знакомство</Link>
						</li>
						<li>
							<Link to="/new">Что нового</Link>{" "}
						</li>
						<li>Интеграции</li>
						<li>
							<Link to="/upgrade">Обновить</Link>
						</li>
					</ul>
				</div>
				<div className="static-footer__links">
					<h4>Сообщество</h4>
					<ul>
						<li>Форумы</li>
						<li>Программа тестирования</li>
						<li>Переводы</li>
						<li>API</li>
					</ul>
				</div>
				<div className="static-footer__links">
					<h4>Поддержка</h4>
					<ul>
						<li>
							<Link to="/help">Помощь</Link>
						</li>
						<li>Советы и хитрости</li>
						<li>
							<a href="mailto:devwork.trifonov@gmail.com">
								Связаться с нами
							</a>
						</li>
					</ul>
				</div>
				{/* </div> */}
			</div>
		</footer>
	);
}
