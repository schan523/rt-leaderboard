import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
    const [ token, setToken ] = useState(); 

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('/api/login');
                console.log(response);
                setToken(response);
            } catch {
                setToken(null);
            }
        }

        fetchToken();
    }, []);
}

export { AuthProvider } 