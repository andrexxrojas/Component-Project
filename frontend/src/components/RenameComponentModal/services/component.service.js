const API_URL = import.meta.env.VITE_API_URL;

export const UpdateComponent = async (id, title) => {
    const res = await fetch (`${API_URL}/components/save-component`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            id,
            title
        })
    });

    if (!res.ok) {
        throw new Error("Failed to update component");
    }

    return res.json();
}