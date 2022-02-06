export const Container = props => {
    return (
        <div className=" h-full  w-full flex items-center justify-center overflow-x-hidden overflow-y-hidden bg-red-500 ">
            {props.children}
        </div>
    );
};
