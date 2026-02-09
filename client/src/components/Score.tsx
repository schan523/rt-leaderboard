import { authContextValue } from '../context/authContext.tsx';
import { useForm } from 'react-hook-form';

type scoreFormData = {

}

export const Score = () => {
    const { token, setToken } = authContextValue();
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
                "Authorization": ""
            },
            body: JSON.stringify(data)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="game">Select a game </label>
                <select {...register("game")}>
                    <option value="hollow-knight"> Hollow Knight </option>
                    <option value="silksong"> Silksong </option>
                    <option value="minecraft"> Minecraft </option>
                </select>
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