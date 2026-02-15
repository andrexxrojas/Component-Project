import styles from "./Nav.module.css";
import {ArrowLeftIcon, FloppyDiskIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

export default function Nav({title, onSave}) {
    const navigate = useNavigate();

    const handleGoBack = async (e) => {
        e.preventDefault();
        navigate("/components");
    }

    return (
        <div className={styles["nav-wrapper"]}>
            <nav className={styles["nav-container"]}>
                <div className={`${styles["nav-group"]} ${styles["left"]}`}>
                    <button className={styles["back-btn"]} onClick={handleGoBack}>
                        <ArrowLeftIcon size={16} weight="bold"/>
                    </button>
                    <h4 className={styles["nav-title"]}>{title}</h4>
                </div>
                <div className={`${styles["nav-group"]} ${styles["right"]}`}>
                    <button className={`${styles["btn"]} ${styles["save"]}`} onClick={onSave}>
                        <FloppyDiskIcon size={16}/>
                        Save
                    </button>
                    <button className={`${styles["btn"]} ${styles["share"]}`}>
                        <ShareNetworkIcon size={16}/>
                    </button>
                </div>
            </nav>
        </div>
    )
}