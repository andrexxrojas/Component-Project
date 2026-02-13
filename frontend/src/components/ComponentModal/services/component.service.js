const API_URL = import.meta.env.VITE_API_URL;

export const CreateComponent = async (title, visibility = "public") => {
    const res = await fetch(`${API_URL}/components/new-component`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            title,
            visibility
        })
    });

    if (!res.ok) {
        throw new Error("Failed to create component.");
    }

    return res.json();
}

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
