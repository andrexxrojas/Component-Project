const API_URL = import.meta.env.VITE_API_URL;

export const GetSharedProjectComponent = async (projectShareId, componentId) => {
    const res = await fetch(`${API_URL}/projects/shared/${projectShareId}/component/${componentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch component from shared project.");
    }

    return res.json();
}