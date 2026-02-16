const API_URL = import.meta.env.VITE_API_URL;

export const GetProject = async (id) => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch project.");
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

export const RemoveComponentFromProject = async (projectId, componentId) => {
    const res = await fetch(`${API_URL}/projects/remove-component`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            projectId,
            componentId
        })
    })

    if (!res.ok) {
        throw new Error("Failed to remove component from project.");
    }

    return res.json();
}

export const ShareProject = async (id, isPublic = true) => {
    const res = await fetch(`${API_URL}/projects/${id}/share`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isPublic })
    });

    if (!res.ok) {
        throw new Error("Failed to share project.");
    }

    return res.json();
}
