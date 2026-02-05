import { useState } from 'react';
import { useForm } from 'react-hook-form';

type RegisterFormData = {
    username: string,
    password: string
}

export const Register = () => {
    const { 
        register,
        handleSubmit
    } = useForm<RegisterFormData>();
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    
    const onSubmit = async (formData: RegisterFormData) => {
        const data: Record<string, string> = {"username": formData.username, "password": formData.password};

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
                <label htmlFor="username"> Email </label>
                <input {...register("username", { required: true })} />
                <br />
                <label htmlFor="password"> Password </label>
                <input type="password" {...register("password", { required: true })} />
                <br />
                <button type="submit"> Register </button>
            </form>
        </div>
    );

    // return (
    //     <form action={register}>
    //         <label htmlFor="username"> Email </label>
    //         <input type="text" name="username" required/>
    //         <br />
    //         <label htmlFor="password"> Password </label>
    //         <input type="password" name="password" required />
    //         <br />
    //         <button type="submit"> Submit </button>
    //     </form>
    // );
} 