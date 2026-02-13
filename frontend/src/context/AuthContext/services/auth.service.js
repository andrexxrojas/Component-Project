const API_URL = import.meta.env.VITE_API_URL;

export async function Signup(username, email, password) {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        })
    });

    if (!res.ok) {
        throw new Error("Failed to register user.");
    }

    return res.json();
}

export async function Login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    if (!res.ok) {
        throw new Error("Failed to login user.");
    }

    return res.json();
}

export async function Logout() {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Failed to logout user.");
    }

    return res.json();
}

export async function CheckAuth() {
    const res = await fetch(`${API_URL}/auth/check`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Failed to check user.");
    }

    return res.json();
}