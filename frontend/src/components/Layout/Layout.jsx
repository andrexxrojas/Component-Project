import styles from "./Layout.module.css";
import {AuthProvider} from "../../context/AuthContext.jsx";
import {ModalProvider} from "../../context/ModalContext.jsx";
import ModalManager from "../ModalManager/ModalManager.jsx";

export default function Layout({ children }) {
    return (
        <div className={styles["layout-wrapper"]}>
            <AuthProvider>
                <ModalProvider>
                    <main className={styles["main-wrapper"]}>
                        {children}
                    </main>
                    <ModalManager/>
                </ModalProvider>
            </AuthProvider>
        </div>
    )
}