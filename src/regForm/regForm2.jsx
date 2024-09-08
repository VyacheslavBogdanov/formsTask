import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './regForm.module.css';
import { useRef, useEffect } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(/^[^@]+@\w+(\.\w+)+\w$/, 'Неверный email')
		.min(5, 'Должно быть не меньше 5 символов')
		.max(20, 'Должно быть не больше 20 символов'),
	password: yup.string().min(5, 'Должно быть не меньше 5 символов'),
	repPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const RegForm2 = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'all',
	});

	const buttonRef = useRef(null);

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repPasswordError = errors.repPassword?.message;

	return (
		<div className={styles.form}>
			<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
				<label htmlFor="email">EMAIL</label>
				<input type="text" placeholder="Введите email" {...register('email')} />
				{emailError && <div className={styles.error}>{emailError}</div>}

				<label htmlFor="password">PASSWORD</label>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}

				<label htmlFor="repPassword">REPEAT PASSWORD</label>
				<input
					name="repPassword"
					type="password"
					placeholder="Повтор пароля"
					{...register('repPassword')}
				/>
				{repPasswordError && (
					<div className={styles.error}>{repPasswordError}</div>
				)}
				<button type="submit" disabled={!isValid} ref={buttonRef}>
					Регистрация
				</button>
			</form>
		</div>
	);
};
