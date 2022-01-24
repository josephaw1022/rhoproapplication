import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoggedIn(props) {
	const router = useRouter();

	useEffect(() => {
		const authToken = sessionStorage.getItem("tdx-token");
		if (authToken != "replace-later") router.push("/");
	}, []);

	return props.children;
}
