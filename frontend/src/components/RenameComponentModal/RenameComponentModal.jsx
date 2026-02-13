import styles from "./RenameComponentModal.module.css";
import {XIcon} from "@phosphor-icons/react";
import {UpdateComponent} from "./services/component.service.js";
import {useState} from "react";

export default function RenameComponentModal({onClose, component, onComponentUpdated}) {
    const [title, setTitle] = useState(component?.title || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;
        setLoading(true);

        try {
            const res = await UpdateComponent(component._id, title);

            if (onComponentUpdated) {
                onComponentUpdated(res.component);
            }

            onClose();
        } catch (error) {
            console.error("Failed to update component:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>Rename Component</h4>
                    <p className={styles["modal-subtitle"]}>Enter a new name for your component.</p>
                </div>
                <form onSubmit={handleSubmit} className={styles["modal-form"]}>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Component Name</label>
                        <input
                            type="text"
                            className={styles["form-input"]}
                            placeholder="Enter your component name..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            autoFocus
                            required
                        />
                    </div>
                    <div className={styles["modal-actions"]}>
                        <button className={`${styles["btn"]} ${styles["cancel"]}`}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles["btn"]} ${styles["add"]}`}
                        >
                            Rename
                        </button>
                    </div>
                </form>
                <button className={styles["close-btn"]} onClick={onClose}>
                    <XIcon size={16} weight="bold"/>
                </button>
            </div>
        </div>
    )
}