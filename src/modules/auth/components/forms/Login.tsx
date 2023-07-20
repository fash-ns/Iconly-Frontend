import type {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";
import TextField from "../../../ui/components/TextField";
import Button from "../../../ui/components/Button";
import {useAuthMutate} from "../../hooks/auth";
import {FormEventHandler, useState} from "react";
import axios from "axios";
import {UserEntity} from "../../types/UserEntity";
import {setUserInfo} from "../../userDataActions";

const Login: FunctionComponent<{email: string}> = ({email}) => {
    const dispatch = useAuthMutate();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{password?: string}>({});
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const formSubmitHandler: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        setLoading(true);
        axios.post<UserEntity>("/auth/login", {password, email}).then(res => {
            dispatch(setUserInfo(res.data));
            navigate("/");
        }).catch(err => {
            if(err.response && err.response.status === 422)
                setErrors(err.response.data.errors);
        }).finally(() => setLoading(false));
    }


    return (<div>
        <h2>Enter your password</h2>
        <p>Enter your password to access to your account</p>
        <form onSubmit={formSubmitHandler}>
            <TextField type="password" label="Password" value={password} error={errors.password}
                       onChange={e => setPassword((e.target as HTMLInputElement).value)}/>
            <Button type="submit" disabled={loading} fullWidth>Login</Button>
        </form>
    </div>)
}

export default Login;