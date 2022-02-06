import LoggedIn from "../../components/auth/LoggedIn"


export default function Auth({Component, pageProps}){
    return <LoggedIn>
            <Component {...pageProps} /> 
        </LoggedIn>
}