import React from "react";
import { LoadingPage } from "../status/Loading";
import { ErrorPage } from "../status/Error";

export const LoadingOrError = ({ error, loading, ...props }) => {
    return error ? (
        <ErrorPage />
    ) : loading ? (
        <LoadingPage />
    ) : (
        props.children
    );
};
