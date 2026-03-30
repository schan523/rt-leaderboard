export const customFetch = async (url: string, params: RequestInit) => {
    let response = await fetch(url, {...params, credentials: 'include' });
    if (response.status === 401) {
        let success = false;

        try {
            const refreshResponse = await fetch('/api/refresh', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!refreshResponse.ok) {
                throw new Error("Refresh failed");
            }
            success = true;

        } catch (err) {
            console.error('Refresh token error', err);
        }

        if (success) {
            response = await fetch(url, {...params, credentials: 'include'}); 
        }
    }

    return response;
}
