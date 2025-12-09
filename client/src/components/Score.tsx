export const Score = () => {
    async function submit(formData: FormData) {
        const data = {};
        for (const [name, value] of formData) {
            data[name] = value;
        }

        await fetch('/api/submit', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
            <button type="submit"> Submit </button>
        </form>
    );
}