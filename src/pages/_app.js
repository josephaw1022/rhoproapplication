import "../style/tailwind.css";
import "../style/global.scss";
import { Provider } from "react-redux";
import { store } from "../redux";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<SnackbarProvider>
			<div className="h-screen w-full">
				<Component {...pageProps} />
			</div>
			</SnackbarProvider>
		</Provider>
	);
}

export default MyApp;
