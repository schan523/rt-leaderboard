import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { customFetch } from '../helpers/index.ts';

type scoreFormData = {
    game: string,
    hours: string,
    minutes: string,
    seconds: string
};

export const Score = () => {
    const [showErrors, setShowErrors] = useState(false); 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<scoreFormData>();
    const navigate =  useNavigate();

    const submit = async (formData: scoreFormData) => {
        if (!localStorage.getItem("username")) {
            navigate('/login', { replace: true });
            return;
        }

        const data : Record<string, string> = {
            "game": formData.game, 
            "hours": formData.hours, 
            "minutes": formData.minutes, 
            "seconds": formData.seconds 
        }

        // Need to store authorization JWT to frontend 
        const response = await customFetch('/api/lb/submit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            setShowErrors(!showErrors);
        }
        else {
            navigate('/', { replace: true });
        }
    }

    return (
        <div>
            {errors.game && <div><span> Select a game </span> </div> } 
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="game">Select a game: </label>
                <select {...register("game")}>
                    <option value="hollow-knight">Hollow Knight</option>
                    <option value="silksong"> Silksong </option>
                    <option value="minecraft"> Minecraft </option>
                </select>
                <br />
                <span>
                    Time:
                    <input {...register("hours")} />
                    :
                    <input {...register("minutes")} />
                    :
                    <input {...register("seconds")} />
                </span>
                <br />
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}