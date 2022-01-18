import "../style/tailwindconfig.css";
import "../style/global.scss";
import { Provider } from "react-redux";
import { store } from "../redux";

import AWS from "aws-sdk";

AWS.config.update({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_APP,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
	},
});

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
