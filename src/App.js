import styles from './App.module.css';
import { RegForm1 } from './regForm/regForm1.jsx';
import { RegForm2 } from './regForm/regForm2.jsx';

export const App = () => {
	return (
		<div className={styles.App}>
			RegForm1.
			<RegForm1 />
			<br />
			RegForm2.
			<RegForm2 />
			<br />
		</div>
	);
};
