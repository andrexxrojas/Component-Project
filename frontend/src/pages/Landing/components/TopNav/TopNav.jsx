import styles from "./TopNav.module.css";
import {useNavigate} from "react-router-dom";

export default function TopNav() {
    const navigate = useNavigate();

    return (
        <div className={styles["nav-wrapper"]}>
            <nav className={styles["nav-container"]}>
                <div className={styles["logo-container"]}>
                    <h4 className={styles["logo-txt"]}>CodeBase</h4>
                </div>
                <div className={styles["buttons-container"]}>
                    <button
                        className={`${styles["btn"]} ${styles["login"]}`}
                        onClick={() => navigate("/auth?to=login")}
                    >
                        <span className={styles["btn-txt"]}>Log In</span>
                    </button>
                    <button
                        className={`${styles["btn"]} ${styles["register"]}`}
                        onClick={() => navigate("/auth?to=register")}
                    >
                        <span className={styles["btn-txt"]}>Get Started</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}