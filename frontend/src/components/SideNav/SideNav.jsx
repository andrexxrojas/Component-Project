import styles from "./SideNav.module.css";
import {FolderSimpleIcon, SignOutIcon} from "@phosphor-icons/react";
import {useLocation} from "react-router-dom";

export default function SideNav() {
    const location = useLocation();
    const isProjectsPage = location.pathname === '/projects';
    const isComponentsPage = location.pathname === '/components';

    return (
        <nav className={styles["nav-container"]}>
            <div className={styles["top-group"]}>
                <span className={styles["group-label"]}>PLATFORM</span>
                <div className={styles["buttons-container"]}>
                    <button className={`${styles["btn"]} ${isProjectsPage ? styles["active"] : ""}`}>
                        <FolderSimpleIcon size={19}/>
                        <span className={styles["btn-txt"]}>Projects</span>
                    </button>
                    <button className={`${styles["btn"]} ${isComponentsPage ? styles["active"] : ""}`}>
                        <FolderSimpleIcon size={19}/>
                        <span className={styles["btn-txt"]}>Components</span>
                    </button>
                </div>
            </div>
            <div className={styles["bottom-group"]}>
                <button className={styles["account-container"]}>
                    <div className={styles["account-info"]}>
                        <span>Alex Developer</span>
                        <small>Free Plan</small>
                    </div>
                    <SignOutIcon size={16} className={styles["logout-icon"]}/>
                </button>
            </div>
        </nav>
    )
}