const API_URL = import.meta.env.VITE_API_URL;

export const AddToProject = async (projectId, componentId) => {
    const res = await fetch(`${API_URL}/projects/add-component`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            projectId,
            componentId,
        })
    });

    if (!res.ok) {
        throw new Error("Failed to add component to project.");
    }

    return res.json();
}

export const GetProjects = async () => {
    const res = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch projects.");
    }

    return res.json();
}