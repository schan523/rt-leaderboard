import { useFormStatus } from 'react-dom';
import { authContextValue } from '../../context/AuthContext.tsx';

import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form'; 

type LoginFormData = {
    username: string,
    password: string
}

export function LoginForm() {
    const { setToken } = authContextValue();
    const { 
        register, 
        handleSubmit, 
        formState: { isSubmitted } 
    } = useForm<LoginFormData>();
    const navigate = useNavigate();
    const onSubmit = async (formData: LoginFormData) => {
        const data: Record<string, string> = {"username": formData.username, "password": formData.password};

        const response = await fetch('/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const accessToken = await response.json();
            setToken(accessToken);
            navigate("/", { replace: true });
        }
    }

    return (
        <div className="login-form-container">
            {isSubmitted && <div> <span> Invalid login credientials. </span> <br /> </div> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username"> Email </label>
                <input {...register("username", { required: true })} />
                <br />
                <label htmlFor="password"> Password </label>
                <input type="password" {...register("password", { required: true })} /> 
                <br />
                <SubmitButton />
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