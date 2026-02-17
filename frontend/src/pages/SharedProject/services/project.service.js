const API_URL = import.meta.env.VITE_API_URL;

export const GetSharedProject = async (shareId) => {
    const res = await fetch(`${API_URL}/projects/shared/${shareId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch shared project.");
    }

    return res.json();
}