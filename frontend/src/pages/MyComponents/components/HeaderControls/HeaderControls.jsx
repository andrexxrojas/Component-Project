import styles from "./HeaderControls.module.css";
import {PlusIcon} from "@phosphor-icons/react";
import {useModal} from "../../../../context/ModalContext.jsx";

export default function HeaderControls() {
    const { openModal } = useModal();

    const handleNewComponent = () => {
        openModal("createComponent");
    }

    return (
        <div className={styles["header-container"]}>
            <div className={styles["header-info"]}>
                <h1 className={styles["header-title"]}>Components</h1>
                <p className={styles["header-subtitle"]}>
                    Browse, manage, and reuse your UI components across projects.
                </p>
            </div>
            <div className={styles["header-controls"]}>
                <button className={styles["btn"]}>
                    <PlusIcon size={16}/>
                    <span className={styles["btn-txt"]} onClick={handleNewComponent}>
                        New Component
                    </span>
                </button>
            </div>
        </div>
    )
}