import styles from "./ProjectGrid.module.css";
import {
    FolderSimpleIcon,
    DotsThreeVerticalIcon,
    PencilSimpleIcon,
    CopySimpleIcon,
    TrashIcon
} from "@phosphor-icons/react";
import {useState, useEffect, useRef} from "react";
import {useModal} from "../../../../context/ModalContext.jsx";
import {DeleteProject} from "../../services/project.service.js";
import {useNavigate} from "react-router-dom";

const ProjectBox = ({project, onRename, onDelete}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleRenameProject = () => {
        setShowMenu(false);
        onRename(project);
    }

    const handleDeleteProject = () => {
        setShowMenu(false);
        onDelete(project._id);
    }

    const handleProjectClick = (e) => {
        if (e.target.closest(`.${styles["menu-anchor"]}`)) {
            return;
        }
        navigate(`/projects/${project._id}`);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className={styles["project-box"]} onClick={handleProjectClick}>
            <div className={styles["project-header"]}>
                <div className={styles["logo-container"]}>
                    <FolderSimpleIcon size={24}/>
                </div>
                <div className={styles["menu-anchor"]} ref={menuRef}>
                    <button
                        className={styles["menu-btn"]}
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <DotsThreeVerticalIcon size={19} weight="bold"/>
                    </button>
                    {showMenu && (
                        <div className={styles["dropdown-menu"]}>
                            <button className={styles["menu-item"]} onClick={handleRenameProject}>
                                <PencilSimpleIcon size={16}/>
                                Rename
                            </button>
                            <button
                                className={`${styles["menu-item"]} ${styles["warning"]}`}
                                onClick={handleDeleteProject}
                            >
                                <TrashIcon size={16}/>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles["project-info"]}>
                <h4 className={styles["project-title"]}>{project.title}</h4>
                <p className={styles["project-subtitle"]}>
                    {project.description || "No description provided"}
                </p>
            </div>
        </div>
    )
}

export default function ProjectGrid({ projects = [], onProjectUpdated, onProjectDeleted }) {
    const { openModal } = useModal();

    const handleRename = (project) => {
        openModal("renameProject", {
            project,
            onProjectUpdated
        });
    };

    const handleDelete = async (projectId) => {
        try {
            await DeleteProject(projectId);
            onProjectDeleted(projectId);
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <div className={styles['grid-container']}>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectBox
                        key={project._id}
                        project={project}
                        onRename={handleRename}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <div className={styles['empty-txt']}>
                    No projects yet. Create your first project!
                </div>
            )}
        </div>
    );
}