import styles from "./RenameProjectModal.module.css";
import {XIcon} from "@phosphor-icons/react";
import {useState} from "react";
import {UpdateProject} from "./services/project.service.js";

export default function RenameProjectModal({ onClose, project, onProjectUpdated }) {
    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState(project?.description || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;
        setLoading(true);

        try {
            const res = await UpdateProject(
                project._id,
                title,
                description
            );

            if (onProjectUpdated) {
                onProjectUpdated(res.project);
            }

            onClose();
        } catch (error) {
            console.error("Failed to update project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>Rename Project</h4>
                    <p className={styles["modal-subtitle"]}>
                        Enter a new name and description for your project.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className={styles["modal-form"]}>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Project Name</label>
                        <input
                            type="text"
                            className={styles["form-input"]}
                            placeholder="Enter your project name..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            autoFocus
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Description (Optional)</label>
                        <textarea
                            className={styles["form-input"]}
                            placeholder="Enter your project description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                            rows={3}
                        />
                    </div>
                    <div className={styles["modal-actions"]}>
                        <button
                            type="button"
                            className={`${styles["btn"]} ${styles["cancel"]}`}
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles["btn"]} ${styles["add"]}`}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>

                <button
                    className={styles["close-btn"]}
                    onClick={onClose}
                    disabled={loading}
                >
                    <XIcon size={16} weight="bold"/>
                </button>
            </div>
        </div>
    );
}