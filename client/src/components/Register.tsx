import { useState } from 'react';
import { useForm } from 'react-hook-form';

type RegisterFormData = {
    username: string,
    email: string,
    password: string
}

export const Register = () => {
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>();
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    
    const onSubmit = async (formData: RegisterFormData) => {
        const data: Record<string, string> = {"username": formData.username, "email": formData.email, "password": formData.password};

        const response = await fetch('api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            setShowErrorMsg(true);
        }
    }

    return (
        <div className="register-form-container">
            { showErrorMsg && <span> A user with this username already exists.  </span> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username"> Username </label>
                <input {...register("username", { required: true })} />
                <br />
                <label htmlFor="email"> Email </label>
                <input {...register("email", {
                    required: true,
                    pattern: {                    
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                        message: "Invalid email address"
                    }  
                    })} 
                />
                {errors.username && <div> <span> { errors.username.message } </span> </div> } 
                <br />
                <label htmlFor="password"> Password </label>
                <input type="password" {...register("password", { required: true })} />
                <br />
                <button type="submit"> Register </button>
            </form>
        </div>
    );
} 