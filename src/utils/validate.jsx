const validateRules = {
	required: (value) => Boolean(value.trim()),
	minLength: (value, params) => value.length >= params,
	isEmail: (value) => {
		const re = /^[^@]+@\w+(\.\w+)+\w$/;
		return re.test(String(value).toLowerCase());
	},
	isMatch: (value, params, data) => {
		return value === data[params];
	},
};

export const validate = (data, config) => {
	const errors = {};

	for (const value in data) {
		const rules = config[value];

		for (const rule in rules) {
			const { message, params } = rules[rule];
			const validator = validateRules[rule];

			const hasError = validator && !validator(data[value], params, data);

			if (hasError) {
				errors[value] = message;
				break;
			}
		}
	}
	return errors;
};

export const validateSchema = {
	email: {
		required: {
			message: 'Введите email',
		},
		isEmail: {
			message: 'Email не корректный',
		},
	},
	password: {
		required: {
			message: 'Введите пароль',
		},
		minLength: {
			message: 'Пароль должен содержать не менее 5 символов',
			params: 5,
		},
	},
	repPassword: {
		isMatch: {
			message: 'Пароли не совпадают',
			params: 'password',
		},
	},
};
