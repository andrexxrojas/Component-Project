import styles from "./Dashboard.module.css";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";
import HeaderControls from "./components/HeaderControls/HeaderControls.jsx";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid.jsx";

export default function Dashboard() {
    return (
        <div className={styles["dashboard-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <HeaderControls />
                <ProjectGrid />
            </SideNavWrapper>
        </div>
    )
}