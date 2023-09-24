import { Login } from "../components/Login/Login";
import { AuthFailed } from "./AuthFailed";

export const GuardedRoute = (component: any, auth: boolean, successfulLogin: Function) => {
    if(auth){
        return component;
    }else{
        return (
            <Login change={successfulLogin}></Login>
        )
    }

}