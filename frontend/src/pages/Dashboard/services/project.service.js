const API_URL = import.meta.env.VITE_API_URL;

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

export const DeleteProject = async (id) => {
    const res = await fetch(`${API_URL}/projects/delete-project/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to delete project.");
    }

    return res.json();
}

export const UpdateProject = async (id, title, description, visibility = "public") => {
    const res = await fetch(`${API_URL}/projects/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            id,
            title,
            description,
            visibility
        })
    });

    if (!res.ok) {
        throw new Error("Failed to update project");
    }

    return res.json();
}