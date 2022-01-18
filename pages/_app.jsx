import "../style/tailwindconfig.css";
import "../style/global.scss";
import { Provider } from "react-redux";
import {store} from "../redux"

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
		<div className="h-screen w-full">
			<Component {...pageProps} />
		</div>
		</Provider>
	);
}

export default MyApp;
