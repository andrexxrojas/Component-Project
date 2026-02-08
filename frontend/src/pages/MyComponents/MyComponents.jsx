import styles from "./MyComponents.module.css";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";
import HeaderControls from "./components/HeaderControls/HeaderControls.jsx";

export default function MyComponents() {
    return (
        <div className={styles["my-components-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <HeaderControls />
            </SideNavWrapper>
        </div>
    )
}