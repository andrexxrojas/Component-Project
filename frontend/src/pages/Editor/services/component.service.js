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

export const SaveComponent = async (id, files) => {
    const res = await fetch (`${API_URL}/components/save-component`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            id,
            files: files,
        })
    });

    if (!res.ok) {
        throw new Error("Failed to update component");
    }

    return res.json();
}

export const ShareComponent = async (id, isPublic = true) => {
    const res = await fetch(`${API_URL}/components/${id}/share`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isPublic })
    });

    if (!res.ok) {
        throw new Error("Failed to share component.");
    }

    return res.json();
};

export const GetSharedComponent = async (shareId) => {
    const res = await fetch(`${API_URL}/components/shared/${shareId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch shared component.");
    }

    return res.json();
};