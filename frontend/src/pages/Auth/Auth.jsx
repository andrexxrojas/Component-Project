import styles from "./Auth.module.css";
import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <div className={styles["form-group"]}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    autoFocus
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
                />
            </div>

            <button type="submit" className={styles["submit-btn"]}>
                Log In
            </button>
        </form>
    );
};

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
            <div className={styles["form-group"]}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    autoFocus
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
                />
            </div>

            <button type="submit" className={styles["submit-btn"]}>
                Create Account
            </button>
        </form>
    );
}

export default function Auth() {
    const [activeTab, setActiveTab] = useState("login");
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const tab = searchParams.get('type');
        if (tab === 'login' || tab === 'register') {
            setActiveTab(tab);
        }
    }, [searchParams]);

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
                {activeTab === "login" ? (<LoginForm />) : (<SignupForm/>)}
            </div>
        </div>
    )
}