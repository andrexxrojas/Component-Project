import styles from "./Nav.module.css";
import {ArrowLeftIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";


export default function Nav({title}) {
    const navigate = useNavigate();

    const handleGoBack = async (e) => {
        e.preventDefault();
        navigate("/components");
    }

    return (
        <div className={styles["nav-wrapper"]}>
            <nav className={styles["nav-container"]}>
                <div className={`${styles["nav-group"]} ${styles["left"]}`}>
                    <h4 className={styles["nav-title"]}>{title}</h4>
                </div>
            </nav>
        </div>
    )
}