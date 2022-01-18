import "../style/tailwindconfig.css";
import "../style/global.scss";
import { Provider } from "react-redux";
import { store } from "../redux";
import AWS from "aws-sdk";

AWS.config.update({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.CLUSTER_ARN,
		secretAccessKey: process.env.SECRET_ARN,
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
