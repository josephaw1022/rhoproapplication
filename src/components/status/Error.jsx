export const ErrorPage = props => (
    <div className="h-screen w-full justify-center items-center gap-3">
        <h1 className="text-xl">{props?.message || "Error"}</h1>
    </div>
);
