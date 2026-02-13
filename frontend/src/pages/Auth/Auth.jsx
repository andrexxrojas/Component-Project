import styles from "./Auth.module.css";
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';

const LoginForm = () => {
    const [username, setUsername] = useState(''); // Changed from email to username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(username, password);
        } catch (err) {
            setError(err.message || 'Failed to login. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
            {error && <div className={styles["error-message"]}>{error}</div>}

            <div className={styles["form-group"]}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
                    autoComplete="username"
                    required
                    autoFocus
                    disabled={loading}
                />
            </div>

            <div className={styles["form-group"]}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    minLength={6}
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                className={styles["submit-btn"]}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    );
};

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { signup, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await signup(formData.username, formData.email, formData.password);
        } catch (err) {
            setError(err.message || 'Failed to create account. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
            {error && <div className={styles["error-message"]}>{error}</div>}

            <div className={styles["form-group"]}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    autoComplete="username"
                    required
                    autoFocus
                    disabled={loading}
                />
            </div>

            <div className={styles["form-group"]}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={loading}
                />
            </div>

            <div className={styles["form-group"]}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    disabled={loading}
                />
            </div>

            <div className={styles["form-group"]}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                className={styles["submit-btn"]}
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
};

export default function Auth() {
    const [activeTab, setActiveTab] = useState("login");
    const [searchParams] = useSearchParams();
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, loading, navigate]);

    useEffect(() => {
        const tab = searchParams.get('type');
        if (tab === 'login' || tab === 'register') {
            setActiveTab(tab);
        }
    }, [searchParams]);

    if (loading) {
        return (
            <div className={styles["auth-wrapper"]}>
                <div className={styles["auth-container"]}>
                    <div className={styles["loading-state"]}>Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["auth-wrapper"]}>
            <div className={styles["auth-container"]}>
                <div className={styles["auth-info"]}>
                    <h4 className={styles["auth-info-title"]}>Welcome to CodeBase</h4>
                    <p className={styles["auth-info-subtitle"]}>
                        The modern development environment for frontend teams.
                    </p>
                </div>
                <div className={styles["tab-container"]}>
                    <button
                        className={`${styles["tab-btn"]} ${activeTab === "login" ? styles["active"] : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        <span className={styles["tab-btn-txt"]}>Login</span>
                    </button>
                    <button
                        className={`${styles["tab-btn"]} ${activeTab === "register" ? styles["active"] : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        <span className={styles["tab-btn-txt"]}>Sign Up</span>
                    </button>
                </div>
                {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>
        </div>
    );
}