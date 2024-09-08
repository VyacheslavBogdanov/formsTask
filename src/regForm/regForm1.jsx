import styles from './regForm.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { validate, validateSchema } from '../utils/validate';

export const RegForm1 = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		repPassword: '',
	});

	const [error, setError] = useState({});

	const [touched, setTouched] = useState({
		email: false,
		password: false,
		repPassword: false,
	});

	const isValid = Object.keys(error).length === 0;

	const buttonRef = useRef(null);

	const onChange = (event) => {
		const { name, value } = event.target;
		setData((prevState) => ({ ...prevState, [name]: value }));

		if (!touched[name]) {
			setTouched((prevState) => ({ ...prevState, [name]: true }));
		}
	};

	const handleBlur = (event) => {
		const { name } = event.target;
		setTouched((prevState) => ({ ...prevState, [name]: true }));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (isValid) {
			console.log(data);
		}
	};

	useEffect(() => {
		const errors = validate(data, validateSchema);

		setError(errors);
	}, [data]);

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	const showError = (name) => {
		return touched[name] && error[name];
	};

	return (
		<div className={styles.form}>
			<form className={styles.form} onSubmit={onSubmit}>
				<label htmlFor="email">EMAIL</label>
				<input
					name="email"
					type="email"
					placeholder="Введите email"
					value={data.email}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{showError('email') && <p className={styles.error}>{error.email}</p>}
				<label htmlFor="password">PASSWORD</label>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={data.password}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{showError('password') && (
					<p className={styles.error}>{error.password}</p>
				)}
				<label htmlFor="repPassword">REPEAT PASSWORD</label>
				<input
					name="repPassword"
					type="password"
					placeholder="Повтор пароля"
					value={data.repPassword}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{showError('repPassword') && (
					<p className={styles.error}>{error.repPassword}</p>
				)}
				<button type="submit" disabled={!isValid} ref={buttonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
