export const Score = () => {
    async function submit(formData: FormData) {
        const data = {};
        for (const [name, value] of formData) {
            data[name] = value;
        }

        // Need to store authorization JWT to frontend 
        await fetch('/api/lb/submit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": ""
            },
            body: JSON.stringify(data)
        })
    }

    return (
        <form action={ submit }>
            <label htmlFor="game">Select a game</label>
            <select name="game" id="game">
                <option value="hollow-knight"> Hollow Knight </option>
                <option value="silksong"> Silksong </option>
                <option value="minecraft"> Minecraft </option>
            </select>
            <br />
            <span>
                Time:
                <input type="text" id="hours"></input>
                :
                <input type="text" id="minutes"></input>
                :
                <input type="text" id="seconds"></input>
            </span>
            <br />
            <button type="submit"> Submit </button>
        </form>
    );
}