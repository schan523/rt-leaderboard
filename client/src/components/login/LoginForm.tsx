import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useNavigate } from 'react-router';
import { login } from './actions.ts';
import { authContextValue } from '../../context/AuthContext.tsx';

export function LoginForm() {
    const [state, loginAction] = useActionState(login, null);
    const { token, setToken } = authContextValue();

    console.log(state);
    let hideError = true;
    if (state) {
        setToken(state);
    } else {
        hideError = false
    }
    // setToken(state[0]);
    // console.log(state[1]);


    return (
        <div className="login-form-container">
            { !hideError ? 
                <div>
                    <span>Invalid username or password</span>
                    <br/> <br/>
                </div> 
            : <div></div> }
        
            <form action={loginAction}>
                <label htmlFor="username"> Email </label>
                <input type="text" name="username" required />
                <br />
                <label htmlFor="password"> Password </label>
                <input type="password" name="password" required/>
                <br />
                < SubmitButton />
            </form>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit"> Login </button>
    );
}