import styles from "./HeaderControls.module.css";
import {ArrowLeftIcon, PlusIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import {useModal} from "../../../../context/ModalContext.jsx";

export default function HeaderControls({title, description, projectId, onComponentCreated}) {
    const navigate = useNavigate();
    const { openModal } = useModal();

    const handleNewComponent = () => {
        openModal("createComponent", {
            projectId,
            onComponentCreated
        })
    }

    return (
        <div className={styles["header-container"]}>
            <div className={styles["header-info-wrapper"]}>
                <button
                    className={styles["back-btn"]}
                    onClick={() => navigate("/projects")}
                >
                    <ArrowLeftIcon size={19}/>
                </button>
                <div className={styles["header-info"]}>
                    <h1 className={styles["header-title"]}>{title}</h1>
                    <p className={styles["header-subtitle"]}>
                        {description}
                    </p>
                </div>
            </div>
            <div className={styles["header-controls"]}>
                <button className={styles["btn"]} onClick={handleNewComponent}>
                    <PlusIcon size={16}/>
                    <span className={styles["btn-txt"]}>
                        New Component
                    </span>
                </button>
            </div>
        </div>
    )
}