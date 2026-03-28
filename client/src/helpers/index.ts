export const customFetch = async (url: string, params: RequestInit) => {
    let response = await fetch(url, params);
    if (!response.ok) {
        const refreshResponse = await fetch('/api/refresh', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const newToken = await refreshResponse.json();
        // Resend request with returned access token
        if (newToken !== "Session expired") {
            let newParams: RequestInit = {...params};
            newParams.headers["Authorization"] = newToken;

            response = await fetch(url, newParams);
        }
    }

    return response;
}