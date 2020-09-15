import React, { useEffect } from "react";
import Swiper from "swiper";

export default function Home() {
	var mySwiper = {};
	useEffect(() => {
		mySwiper = new Swiper(".swiper-container", {
			// Optional parameters
			direction: "horizontal",
			loop: true,

			// If we need pagination
			pagination: {
				el: ".swiper-pagination",
				clickable: "true",
			},
			autoplay: {
				delay: 4200,
			},
			speed: 800,
			on: {
				transitionStart: () => changeBackgroundColor(),
			},
		});
	}, []);

	useEffect(() => {
		return () => (document.body.classList = "");
	});

	function changeBackgroundColor() {
		let slideActiveIndex = document.querySelector(".swiper-slide-active")
			.dataset.swiperSlideIndex;
		document.body.classList = [`rts-carousel-${slideActiveIndex}`];
	}

	return (
		<main className="rts__main static-main static-main_page_home">
			<header className="static-main__header">
				<div className="container">
					<h1>Универсальное приложение-список для занятых людей.</h1>

					<a href="/register/">Зарегистрироваться</a>
				</div>
			</header>
			<section className="static-main__content">
				<div className="swiper-container ">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<div className="swiper-slide__clouds">
								<span>Позвонить бобу вечером</span>
								<span>Качать скилы</span>
							</div>
							<div className="swiper-slide__img"></div>
							<h2>Получить списки дел из вашей головы</h2>
							<p>
								Хватит думать о вашем списке дел - позвольте
								приложению помнить все за вас.
							</p>
						</div>
						<div className="swiper-slide">
							<div className="swiper-slide__img"></div>
							<h2>Получай напоминания где угодно.</h2>
							<p>
								Вы больше никогда не забудете о саморазвитии
								(или о чём-нибудь другом).
							</p>
						</div>
						<div className="swiper-slide">
							<div className="swiper-slide__img"></div>
							<h2>Добьемся цели вместе.</h2>
							<p>
								Делитесь списками и делегируйте задачи другим,
								чтобы дела выполнялись быстрее.
							</p>
						</div>
						<div className="swiper-slide">
							<div className="swiper-slide__img"></div>
							<h2>Куда бы ты ни пошел.</h2>
							<p>
								Remember To Progress волшебным образом
								синхронизируется на всех ваших устройствах.
							</p>
						</div>
					</div>
					<div className="swiper-pagination swiper-pagination-clickable"></div>
				</div>
			</section>
		</main>
	);
}
