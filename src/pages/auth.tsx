import AuthRoot from "../modules/auth/components/AuthRoot";
import EmailEntrance from "../modules/auth/components/forms/EmailEntrance";
import Login from "../modules/auth/components/forms/Login";
import Register from "../modules/auth/components/forms/Register";
import {useState} from "react";
import {AuthSteps} from "../modules/auth/enums/AuthSteps";

export default function AuthEntry() {
    const [formStep, setFormStep] = useState<AuthSteps>(AuthSteps.EMAIL_ENTRANCE);
    const [email, setEmail] = useState<string>("");
    let form;
    // gets current active form step.
    switch (formStep) {
        case AuthSteps.EMAIL_ENTRANCE:
            form = <EmailEntrance setEmail={setEmail} setStep={setFormStep}/>
            break;
        case AuthSteps.LOGIN:
            form = <Login email={email}/>
            break;
        case AuthSteps.REGISTER:
            form = <Register email={email}/>
            break;
        default:
            throw new Error("Unrecognized form step")
    }

    return (<AuthRoot>
        {form}
    </AuthRoot>)
}