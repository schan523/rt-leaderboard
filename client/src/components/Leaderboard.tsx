export const Leaderboard = () => {

    const render = async () => {
        const data = "";

        const response = await fetch('/api/lb/board', {
            method: "GET",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    return (
        <div> Leaderboard </div>
    );
}