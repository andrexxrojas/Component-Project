import styles from "./SideNav.module.css";
import {FolderSimpleIcon, SignOutIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import {useEffect} from "react";

export default function SideNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isProjectsPage = location.pathname === '/projects';
    const isComponentsPage = location.pathname === '/components';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className={styles["nav-container"]}>
            <div className={styles["top-group"]}>
                <span className={styles["group-label"]}>PLATFORM</span>
                <div className={styles["buttons-container"]}>
                    <button
                        className={`${styles["btn"]} ${isProjectsPage ? styles["active"] : ""}`}
                        onClick={() => navigate("/projects")}
                    >
                        <FolderSimpleIcon size={19}/>
                        <span className={styles["btn-txt"]}>Projects</span>
                    </button>
                    <button
                        className={`${styles["btn"]} ${isComponentsPage ? styles["active"] : ""}`}
                        onClick={() => navigate("/components")}
                    >
                        <FolderSimpleIcon size={19}/>
                        <span className={styles["btn-txt"]}>Components</span>
                    </button>
                </div>
            </div>
            <div className={styles["bottom-group"]}>
                <button
                    className={styles["account-container"]}
                    onClick={handleLogout}
                >
                    <div className={styles["account-info"]}>
                        <span>{user?.username || "User"}</span>
                        <small>Account</small>
                    </div>
                    <SignOutIcon size={16} className={styles["logout-icon"]}/>
                </button>
            </div>
        </nav>
    )
}