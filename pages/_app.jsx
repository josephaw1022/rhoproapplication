import "../style/tailwindconfig.css";
import "../style/global.scss";
import { Provider } from "react-redux";
import { store } from "../redux";
import AWS from "aws-sdk";

AWS.config.update(
	{
		accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // Generated on step 1
		secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // Generated on step 1
		region: "us-east-1", // Must be the same as your bucket
		signatureVersion: "v4",
	},
	true
);

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
