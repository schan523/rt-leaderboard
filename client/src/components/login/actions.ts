    
export async function login(prevState: any, formData: FormData) {
    const data: Record<string, FormDataEntryValue> = {};
    for (const [name, value] of formData) {
        data[name] = value;
    }

    const response = await fetch('/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    prevState = await response.json();
    return prevState;
}