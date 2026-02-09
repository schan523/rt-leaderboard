import { useState } from 'react'; 
import { authContextValue } from '../context/authContext.tsx';
import { useForm } from 'react-hook-form';

type scoreFormData = {
    game: string,
    hours: string,
    minutes: string,
    seconds: string
}

export const Score = () => {
    const { token } = authContextValue();
    const [showErrors, setShowErrors] = useState(false); 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<scoreFormData>();

    const submit = async (formData: scoreFormData) => {
        const data : Record<string, string> = {}

        // Need to store authorization JWT to frontend 
        const response = await fetch('/api/lb/submit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token }`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            setShowErrors(!showErrors);
        }
    }

    return (
        <div>
            {errors.game && <div><span> Select a game </span> </div> } 
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="game">Select a game: </label>
                <select {...register("game")}>
                    <option value="hollow-knight"> Hollow Knight </option>
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

    // return (
    //     <form action={ submit }>
    //         <label htmlFor="game">Select a game</label>
    //         <select name="game" id="game">
    //             <option value="hollow-knight"> Hollow Knight </option>
    //             <option value="silksong"> Silksong </option>
    //             <option value="minecraft"> Minecraft </option>
    //         </select>
    //         <br />
    //         <span>
    //             Time:
    //             <input type="text" id="hours"></input>
    //             :
    //             <input type="text" id="minutes"></input>
    //             :
    //             <input type="text" id="seconds"></input>
    //         </span>
    //         <br />
    //         <button type="submit"> Submit </button>
    //     </form>
    // );
}