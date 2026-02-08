import styles from "./ProjectView.module.css";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";
import HeaderControls from "./components/HeaderControls/HeaderControls.jsx";
import ComponentGrid from "./components/ComponentGrid/ComponentGrid.jsx";

export default function ProjectView() {
    return (
        <div className={styles["project-view-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <HeaderControls
                    title="E-Commerce UI Kit"
                    description="A collection of modern cards and layouts for online stores."
                />
                <ComponentGrid/>
            </SideNavWrapper>
        </div>
    )
}