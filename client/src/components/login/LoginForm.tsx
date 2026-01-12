import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from './actions.ts';
import { authContextValue } from '../../context/AuthContext.tsx';

export function LoginForm() {
    const [state, loginAction] = useActionState(login, null);
    const { token, setToken } = authContextValue();
    setToken(state);
    // console.log(state);

    return (
        <form action={loginAction}>
            <label htmlFor="username"> Email </label>
            <input type="text" name="username" required />
            <br />
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" required/>
            <br />
            < SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit"> Login </button>
    );
}