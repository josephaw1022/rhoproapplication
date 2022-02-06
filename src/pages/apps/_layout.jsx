import LoggedIn from "../../components/auth/LoggedIn"


export default function LoggedIn({Component, pageProps}){
    return <LoggedIn>
            <Component {...pageProps} /> 
        </LoggedIn>
}