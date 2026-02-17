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
    // FIRST generate screenshot
    let imageUrl = null;

    try {
        const screenshotRes = await fetch(`${API_URL}/screenshot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                css: files.css,
                js: files.js
            })
        });

        if (screenshotRes.ok) {
            const screenshotData = await screenshotRes.json();
            imageUrl = screenshotData.imageUrl;
            console.log("Screenshot generated successfully");
        }
    } catch (screenshotError) {
        console.error("Screenshot generation failed:", screenshotError);
        // Continue with save even if screenshot fails
    }

    // THEN save component WITH the screenshot URL
    const saveRes = await fetch(`${API_URL}/components/save-component`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            id,
            files: files,
            imageUrl: imageUrl // Include the screenshot URL
        })
    });

    if (!saveRes.ok) {
        throw new Error("Failed to update component");
    }

    return saveRes.json();
};

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