import type {FunctionComponent, FormEventHandler, ChangeEventHandler} from "react";
import {useNavigate} from "react-router-dom";
import TextField from "../../../ui/components/TextField";
import Button from "../../../ui/components/Button";
import {useState} from "react";
import axios from "axios";
import {useAuthMutate} from "../../hooks/auth";
import {UserEntity} from "../../types/UserEntity";
import {setUserInfo} from "../../userDataActions";

export interface FormFields {
    name: string,
    password: string,
    password_confirmation: string
}

const Register: FunctionComponent<{email: string}> = ({email}) => {
    const dispatch = useAuthMutate();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<FormFields>>({});
    const [loading, setLaoding] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormFields>({
        name: "",
        password: "",
        password_confirmation: ""
    });

    const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const formSubmitHandler: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        setLaoding(true);
        axios.post<UserEntity>("/auth/register", {...formData, email}).then(res => {
            dispatch(setUserInfo(res.data));
            navigate("/");
        }).catch(err => {
            if(err.response && err.response.status === 422)
                setErrors(err.response.data.errors);
        }).finally(() => setLaoding(false));
    }

    return (<div>
        <h2>Sign up</h2>
        <p>You haven't signed up yet! Enter your name and choose a password to continue</p>
        <form onSubmit={formSubmitHandler}>
            <TextField label="Name" name="name" onChange={inputChangeHandler} error={errors.name}/>
            <TextField type="password" label="Password" name="password" onChange={inputChangeHandler}
                       error={errors.password}/>
            <TextField type="password" label="Password again" name="password_confirmation"
                       onChange={inputChangeHandler} error={errors.password_confirmation}/>
            <Button type="submit" disabled={loading} fullWidth>Sign up</Button>
        </form>
    </div>)
}

export default Register;