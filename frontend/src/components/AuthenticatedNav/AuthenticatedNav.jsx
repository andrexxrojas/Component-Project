import styles from "./AuthenticatedNav.module.css";
import {MagnifyingGlassIcon, PlusIcon} from "@phosphor-icons/react";
import {useModal} from "../../context/ModalContext.jsx";

export default function AuthenticatedNav({ onProjectCreated }) {
    const { openModal } = useModal();

    const handleNewProject = () => {
        openModal("createProject", {
            onProjectCreated
        });
    }

    return (
        <div className={styles["nav-wrapper"]}>
            <nav className={styles["nav-container"]}>
                <div className={styles["logo-container"]}>
                    <h4 className={styles["logo-txt"]}>CodeBase</h4>
                </div>
                <div className={styles["nav-right"]}>
                    <div className={styles["search-container"]}>
                        <MagnifyingGlassIcon size={16}/>
                        <input
                            type="text"
                            className={styles["search-input"]}
                            placeholder="Search..."
                        />
                    </div>
                    <button className={styles["btn"]} onClick={handleNewProject}>
                        <PlusIcon size={16}/>
                        <span className={styles["btn-txt"]}>New project</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}