import styles from "./HeaderControls.module.css";
import {PlusIcon} from "@phosphor-icons/react";
import {useModal} from "../../../../context/ModalContext.jsx";

export default function HeaderControls({ onProjectCreated }) {
    const { openModal } = useModal();

    const handleNewProject = () => {
        openModal("createProject", {
            onProjectCreated: onProjectCreated
        });
    }

    return (
        <div className={styles['header-container']}>
            <div className={styles["header-info"]}>
                <h1 className={styles["header-title"]}>Projects</h1>
                <p className={styles["header-subtitle"]}>
                    Create, organize, and manage all your development projects.
                </p>
            </div>
            <div className={styles["header-controls"]}>
                <button className={styles["btn"]} onClick={handleNewProject}>
                    <PlusIcon size={16}/>
                    <span className={styles["btn-txt"]}>
                        New Project
                    </span>
                </button>
            </div>
        </div>
    );
}