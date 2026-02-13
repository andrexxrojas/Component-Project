import styles from "./ComponentModal.module.css";
import {XIcon} from "@phosphor-icons/react";
import {useState} from "react";
import {CreateComponent, AddToProject} from "./services/component.service.js";

export default function ComponentModal({onClose, projectId, onComponentCreated}) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;
        setLoading(true);

        try {
            const response = await CreateComponent(title);

            console.log(response);

            if (projectId) {
                await AddToProject(projectId, response.component._id);
            }

            if (onComponentCreated) {
                onComponentCreated(response.component);
            }

            onClose();
        } catch (error) {
            console.error("Failed to create component:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>New Component</h4>
                    <p className={styles["modal-subtitle"]}>Create a new component.</p>
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
                            disabled={loading}
                        >
                            Create Component
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