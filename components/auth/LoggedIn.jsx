import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingOrError } from "../layout/LoadingOrError";
import { useSnackbar } from "notistack";

export default function LoggedIn(props) {
	const [loading, setLoading] = useState(true);
	const { enqueueSnackbar } = useSnackbar();

	const router = useRouter();
	useEffect(() => {
		const authToken = sessionStorage.getItem("tdx-token");
		if (authToken != "replace-later") {
			enqueueSnackbar("Must login");
			router.push("/");
		}
		setLoading(false);
	}, []);

	return (
		<LoadingOrError error={false} loading={loading}>
			{props.children}
		</LoadingOrError>
	);
}
