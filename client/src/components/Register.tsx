// import { useState, useEffect } from 'react';

export const Register = () => {
    async function register(formData: FormData)  {
        const data = {};
        for (const [name, value] of formData) {
            data[name] = value;
        }

        await fetch('api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    return (
        <form action={register}>
            <label htmlFor="username"> Email </label>
            <input type="text" name="username" required/>
            <br />
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" required />
            <br />
            <button type="submit"> Submit </button>
        </form>
    );
} 