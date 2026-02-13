const API_URL = import.meta.env.VITE_API_URL;

export const CreateProject = async (title, description, visibility = "public") => {
    const res = await fetch(`${API_URL}/projects/new-project`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            title,
            description: description || "",
            visibility
        })
    });

    if (!res.ok) {
        throw new Error("Failed to create project.");
    }

    return res.json();
}