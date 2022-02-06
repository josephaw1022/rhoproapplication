import { CircularProgress } from "@mui/material";

export const LoadingPage = props => {
    return (
        <div className=" h-screen flex justify-center items-center gap-2">
            <CircularProgress />
            <h1 className="text-xl">{props?.message || "Loading"}</h1>
        </div>
    );
};
