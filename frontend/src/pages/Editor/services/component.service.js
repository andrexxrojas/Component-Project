const API_URL = import.meta.env.VITE_API_URL;

export const GetComponent = async (id) => {
    const res = await fetch(`${API_URL}/components/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error("Failed to fetch component details.");
    }

    return res.json();
}