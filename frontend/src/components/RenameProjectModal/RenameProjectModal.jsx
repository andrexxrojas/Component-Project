import styles from "./RenameProjectModal.module.css";
import {XIcon} from "@phosphor-icons/react";

export default function RenameProjectModal({onClose}) {
    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>Rename Project</h4>
                    <p className={styles["modal-subtitle"]}>
                        Enter a new name and description for your project.
                    </p>
                </div>
                <div className={styles["modal-form"]}>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Project Name</label>
                        <input
                            type="text"
                            className={styles["form-input"]}
                            placeholder="Enter your project name..."
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Description (Optional)</label>
                        <input
                            type="text"
                            className={styles["form-input"]}
                            placeholder="Enter your project description..."
                        />
                    </div>
                    <div className={styles["modal-actions"]}>
                        <button className={`${styles["btn"]} ${styles["cancel"]}`}>
                            Cancel
                        </button>
                        <button className={`${styles["btn"]} ${styles["add"]}`}>
                            Save Changes
                        </button>
                    </div>
                    <button className={styles["close-btn"]} onClick={onClose}>
                        <XIcon size={16} weight="bold"/>
                    </button>
                </div>
            </div>
        </div>
    )
}