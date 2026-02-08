import styles from "./ProjectGrid.module.css";
import {
    FolderSimpleIcon,
    DotsThreeVerticalIcon,
    PencilSimpleIcon,
    CopySimpleIcon,
    TrashIcon
} from "@phosphor-icons/react";
import {useState, useEffect, useRef} from "react";

const ProjectBox = ({title, description}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

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
        <div className={styles["project-box"]}>
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
                            <button className={styles["menu-item"]}>
                                <PencilSimpleIcon size={16}/>
                                Rename
                            </button>
                            <button className={styles["menu-item"]}>
                                <CopySimpleIcon size={16}/>
                                Duplicate
                            </button>
                            <button className={`${styles["menu-item"]} ${styles["warning"]}`}>
                                <TrashIcon size={16}/>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles["project-info"]}>
                <h4 className={styles["project-title"]}>{title}</h4>
                <p className={styles["project-subtitle"]}>{description}</p>
            </div>
        </div>
    )
}

export default function ProjectGrid() {
    return (
        <div className={styles['grid-container']}>
            <ProjectBox
                title="E-Commerce UI Kit"
                description="A collection of modern cards and layouts for online stores"
            />
            <ProjectBox
                title="Dashboard Widgets"
                description="Charts, stats cards, and table layouts."
            />
            <ProjectBox
                title="Landing Page Hero"
                description="High conversion hero sections."
            />
            <ProjectBox
                title="Auth Forms"
                description="Login, Signup, and Forgot Password templates."
            />
        </div>
    )
}