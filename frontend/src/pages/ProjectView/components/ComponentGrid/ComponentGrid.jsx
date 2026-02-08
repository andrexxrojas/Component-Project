import styles from "./ComponentGrid.module.css";
import {CodeIcon, CopySimpleIcon, DotsThreeVerticalIcon, PencilSimpleIcon, TrashIcon} from "@phosphor-icons/react";
import {useEffect, useRef, useState} from "react";

const ComponentBox = ({title, preview}) => {
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
        <div className={styles["component-box"]}>
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
            <div className={styles["component-info"]}>
                <h4 className={styles["component-title"]}>{title}</h4>
                <div className={styles["preview-container"]}>
                    {preview ? (
                        <img src={preview} alt="component preview image"/>
                    ) : (
                        <span className={styles["empty-preview-txt"]}>Empty Preview</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function ComponentGrid() {
    return (
        <div className={styles["grid-container"]}>
            <ComponentBox
                title="Product Card"
                preview=""
            />
        </div>
    )
}