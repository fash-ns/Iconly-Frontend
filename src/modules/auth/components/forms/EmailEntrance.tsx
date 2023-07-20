import type {Dispatch, FormEventHandler, FunctionComponent, SetStateAction} from "react";
import {useState} from "react";
import TextField from "../../../ui/components/TextField";
import Button from "../../../ui/components/Button";
import {AuthSteps} from "../../enums/AuthSteps";
import axios from "axios";

export interface EmailEntrancePropsType {
    setStep: Dispatch<SetStateAction<AuthSteps>>,
    setEmail: Dispatch<SetStateAction<string>>
}

const EmailEntrance: FunctionComponent<EmailEntrancePropsType> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        setLoading(true);
        e.preventDefault();
        props.setEmail(email);
        axios.post<{ email: string, existed: boolean }>('/auth/check-existence', {email}).then(res => {
            if (res.data.existed) props.setStep(AuthSteps.LOGIN);
            else props.setStep(AuthSteps.REGISTER);
        }).catch(err => {
            if (err.response && err.response.status === 422)
                setError(err.response.data.errors.email);
        }).finally(() => setLoading(false));
    }
    return (<div>
        <h2>Enter your email address</h2>
        <p>In order to continue enter your email address</p>
        <form method="post" onSubmit={submitHandler}>
            <TextField label="Email address" name="email" value={email} error={error}
                       onChange={e => setEmail((e.target as HTMLInputElement).value)}/>
            <Button type="submit" disabled={loading} fullWidth>Continue</Button>
        </form>
    </div>)
}

export default EmailEntrance;