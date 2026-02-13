const API_URL = import.meta.env.VITE_API_URL;

export const GetComponents = async () => {
    const res = await fetch(`${API_URL}/components`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch components");
    }

    return res.json();
}

export const DeleteComponent = async (id) => {
    const res = await fetch(`${API_URL}/components/delete-component/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to delete component");
    }

    return res.json();
}