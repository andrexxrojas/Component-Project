import styles from "./ComponentGrid.module.css";
import {CodeIcon, CopySimpleIcon, DotsThreeVerticalIcon, PencilSimpleIcon, TrashIcon} from "@phosphor-icons/react";
import {useEffect, useRef, useState} from "react";
import {useModal} from "../../../../context/ModalContext.jsx";
import {DeleteComponent} from "../../services/project.service.js";
import {useNavigate} from "react-router-dom";

const ComponentBox = ({component, onRename, onDelete}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleRename = () => {
        setShowMenu(false);
        onRename(component);
    }

    const handleDelete = () => {
        setShowMenu(false);
        onDelete(component._id);
    }

    const handleNavigate = (e) => {
        if (e.target.closest(`.${styles["menu-btn"]}`) ||
            e.target.closest(`.${styles["dropdown-menu"]}`)) {
            return;
        }
        navigate(`/editor/${component._id}`);
    }

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
        <div className={styles["component-box"]} onClick={handleNavigate}>
            <div className={styles["component-header"]}>
                <div className={styles["logo-container"]}>
                    <CodeIcon size={24}/>
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
                            <button className={styles["menu-item"]} onClick={handleRename}>
                                <PencilSimpleIcon size={16}/>
                                Rename
                            </button>
                            <button
                                className={`${styles["menu-item"]} ${styles["warning"]}`}
                                onClick={handleDelete}
                            >
                                <TrashIcon size={16}/>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles["component-info"]}>
                <h4 className={styles["component-title"]}>{component.title}</h4>
                <div className={styles["preview-container"]}>
                    {component.preview === "" ? (
                        <img src={component.preview} alt="component preview image"/>
                    ) : (
                        <span className={styles["empty-preview-txt"]}>Empty Preview</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function ComponentGrid({ components = [], onComponentUpdated, onComponentDeleted }) {
    const { openModal } = useModal();

    const handleRename = (component) => {
        openModal("renameComponent", {
            component,
            onComponentUpdated,
        })
    }

    const handleDelete = async (componentId) => {
        try {
            await DeleteComponent(componentId);
            onComponentDeleted(componentId);
        } catch (error) {
            console.error("Failed to delete component:", error);
        }
    }

    return (
        <div className={styles["grid-container"]}>
            {components.map((component) => (
                <ComponentBox
                    key={component._id}
                    component={component}
                    onRename={handleRename}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}