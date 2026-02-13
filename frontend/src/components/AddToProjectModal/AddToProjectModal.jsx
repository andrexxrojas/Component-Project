import styles from "./AddToProjectModal.module.css";
import {CaretDownIcon, XIcon} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { GetProjects, AddToProject } from "./services/project.service.js";

export default function AddToProjectModal({onClose, component, onComponentAdded}) {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        void fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await GetProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProject) {
            return;
        }

        setSubmitting(true);

        try {
            await AddToProject(selectedProject, component._id);
            onClose();
        } catch (err) {
            console.error("Failed to add component to project");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal-info"]}>
                    <h4 className={styles["modal-title"]}>Add to Project</h4>
                    <p className={styles["modal-subtitle"]}>
                        Select a project to add "{component?.title || "component"}" to.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles["modal-form"]}>
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]}>Target Project</label>
                        <div className={styles["select-wrapper"]}>
                            <select
                                className={styles["select-input"]}
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                disabled={loading || submitting}
                                required
                            >
                                <option value="">
                                    {loading ? "Loading projects..." : "Select a project"}
                                </option>
                                {projects.map((project) => (
                                    <option key={project._id} value={project._id}>
                                        {project.title}
                                    </option>
                                ))}
                            </select>
                            <span className={styles["select-arrow"]}>
                                <CaretDownIcon size={16}/>
                            </span>
                        </div>

                        {!loading && projects.length === 0 && (
                            <p className={styles["empty-message"]}>
                                No projects available. Create a project first.
                            </p>
                        )}
                    </div>

                    <div className={styles["modal-actions"]}>
                        <button
                            type="button"
                            className={`${styles["btn"]} ${styles["cancel"]}`}
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles["btn"]} ${styles["add"]}`}
                            disabled={loading || submitting || projects.length === 0 || !selectedProject}
                        >
                            {submitting ? "Adding..." : "Add to Project"}
                        </button>
                    </div>
                </form>

                <button
                    className={styles["close-btn"]}
                    onClick={onClose}
                    disabled={submitting}
                >
                    <XIcon size={16} weight="bold"/>
                </button>
            </div>
        </div>
    )
}