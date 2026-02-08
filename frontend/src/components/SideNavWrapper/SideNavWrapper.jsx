import styles from "./SideNavWrapper.module.css";
import SideNav from "../SideNav/SideNav.jsx";

export default function SideNavWrapper({children}) {
    return (
        <div className={styles["sidenav-wrapper"]}>
            <SideNav/>
            <div className={styles["main-container"]}>
                {children}
            </div>
        </div>
    )
}