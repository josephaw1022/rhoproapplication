/**
 * @param  {formikobj } object
 * @param  { extra classes } className
 * @param  {extra props} ...props}
 */
export const FormWrapper = ({ object, className, ...props }) => (
    <form
        className={
            " flex flex-col justify-center items-center lg:gap-4 gap-3 p-4 " +
            className
        }
        {...props}
    >
        {props.children}
    </form>
);

/**
 * @param  {} children
 * @param  {} className
 * @param  {} ...props}
 */
export const FormRow = ({ children, className, ...props }) => (
    <div
        className={
            "flex flex-row gap-4 w-full flex-wrap md:flex-nowrap " +
            className
        }
        {...props}
    >
        {children}
    </div>
);

/**
 * @param  {} children
 * @param  {} className
 * @param  {} ...props}
 */
export const FormTitle = ({ children, className, ...props }) => (
    <h1
        style={{ color: "#1976d2" }}
        className={
            "font-bold flex flex-row gap-4 w-full flex-wrap md:flex-nowrap" +
            className
        }
        {...props}
    >
        {children}
    </h1>
);
