import styles from "./AddToProjectModal.module.css";
import {CaretDownIcon, XIcon} from "@phosphor-icons/react";

export default function AddToProjectModal() {
    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>Add to Project</h4>
                    <p className={styles["modal-subtitle"]}>Select a Project to add component to.</p>
                </div>
                <div className={styles["modal-form"]}>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Target Project</label>
                        <div className={styles["select-wrapper"]}>
                            <select className={styles["select-input"]}>
                                <option value="">Select a project</option>
                                <option value="project1">Project 1</option>
                                <option value="project2">Project 2</option>
                                <option value="project3">Project 3</option>
                            </select>
                            <span className={styles["select-arrow"]}>
                                <CaretDownIcon size={16}/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles["modal-actions"]}>
                    <button className={`${styles["btn"]} ${styles["cancel"]}`}>
                        Cancel
                    </button>
                    <button className={`${styles["btn"]} ${styles["add"]}`}>
                        Add to Project
                    </button>
                </div>
                <button className={styles["close-btn"]}>
                    <XIcon size={16} weight="bold"/>
                </button>
            </div>
        </div>
    )
}