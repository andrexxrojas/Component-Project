import styles from "./Dashboard.module.css";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";

export default function Dashboard() {
    return (
        <div className={styles["dashboard-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <h1>Hello</h1>
            </SideNavWrapper>
        </div>
    )
}