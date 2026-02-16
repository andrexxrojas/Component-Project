import styles from "./HeaderControls.module.css";
import {ArrowLeftIcon, PlusIcon, ShareNetworkIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import {useModal} from "../../../../context/ModalContext.jsx";
import {useEffect, useRef, useState} from "react";
import {ShareProject} from "../../services/project.service.js";

const ShareButton = ({ projectId, type = "project" }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        console.log(shareUrl);
    }, [shareUrl]);

    const handleShare = async () => {
        if (!projectId) return;

        try {
            const data = await ShareProject(projectId, true);
            setShareUrl(data.shareUrl);
            setShowMenu(true);
        } catch (error) {
            console.error("Failed to generate share link:", error);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
    };

    return (
        <div className={styles["menu-anchor"]} ref={menuRef}>
            <button
                className={`${styles["btn"]} ${styles["share"]}`}
                ref={buttonRef}
                onClick={handleShare}
            >
                <ShareNetworkIcon size={16}/>
            </button>
            {showMenu && (
                <div className={styles["dropdown-menu"]}>
                    <div className={styles["share-header"]}>
                        <h4 className={styles["share-title"]}>Share {type}</h4>
                        <p className={styles["share-description"]}>Anyone with the link can view.</p>
                    </div>
                    <div className={styles["share-url-container"]}>
                        <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className={styles["share-url-input"]}
                        />
                        <button
                            className={styles["copy-btn"]}
                            onClick={handleCopy}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function HeaderControls({title, description, projectId, onComponentCreated, hasComponents}) {
    const navigate = useNavigate();
    const { openModal } = useModal();

    const handleNewComponent = () => {
        openModal("createComponent", {
            projectId,
            onComponentCreated
        })
    }

    return (
        <div className={styles["header-container"]}>
            <div className={styles["header-info-wrapper"]}>
                <button
                    className={styles["back-btn"]}
                    onClick={() => navigate("/projects")}
                >
                    <ArrowLeftIcon size={19}/>
                </button>
                <div className={styles["header-info"]}>
                    <h1 className={styles["header-title"]}>{title}</h1>
                    <p className={styles["header-subtitle"]}>
                        {description}
                    </p>
                </div>
            </div>
            <div className={styles["header-controls"]}>
                <button className={styles["btn"]} onClick={handleNewComponent}>
                    <PlusIcon size={16}/>
                    <span className={styles["btn-txt"]}>
                        New Component
                    </span>
                </button>
                {hasComponents && (<ShareButton projectId={projectId}/>)}
            </div>
        </div>
    )
}