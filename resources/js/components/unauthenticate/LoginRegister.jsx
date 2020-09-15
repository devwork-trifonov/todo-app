import React, { useState } from "react";
import { Link } from "react-router-dom";

export function LoginRegister({ Form, link, Message, action }) {
	return (
		<div className="login-register">
			<div className="login-register__left">
				<div className="login-register__left-wrapper">
					<Link to="/" className="login-register__logo logo"></Link>
					<div className="login-register__message">
						<Message />
					</div>
				</div>
			</div>
			<div className="login-register__right">
				<div className="top-bar">
					<Link
						to="/"
						className="logo logo_color_blue top-bar__logo"
					></Link>
					<Link to={link.to} className="login-register__link">
						{link.children}
					</Link>
				</div>
				<Form elementClassName="login-register__form" action={action} />
			</div>
		</div>
	);
}
