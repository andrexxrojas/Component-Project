import styles from "./Layout.module.css";
import {AuthProvider} from "../../context/AuthContext.jsx";

export default function Layout({ children }) {
    return (
        <div className={styles["layout-wrapper"]}>
            <AuthProvider>
                <main className={styles["main-wrapper"]}>
                    {children}
                </main>
            </AuthProvider>
        </div>
    )
}