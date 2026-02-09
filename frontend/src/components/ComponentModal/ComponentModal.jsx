import styles from "./ComponentModal.module.css";
import {XIcon} from "@phosphor-icons/react";

export default function ComponentModal() {
    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>New Component</h4>
                    <p className={styles["modal-subtitle"]}>Create a new component.</p>
                </div>
                <div className={styles["modal-form"]}>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Component Name</label>
                        <input
                            type="text"
                            className={styles["form-input"]}
                            placeholder="Enter your component name..."
                        />
                    </div>
                </div>
                <div className={styles["modal-actions"]}>
                    <button className={`${styles["btn"]} ${styles["cancel"]}`}>
                        Cancel
                    </button>
                    <button className={`${styles["btn"]} ${styles["add"]}`}>
                        Create Component
                    </button>
                </div>
                <button className={styles["close-btn"]}>
                    <XIcon size={16} weight="bold"/>
                </button>
            </div>
        </div>
    )
}