import styles from "./Nav.module.css";
import {ArrowLeftIcon, FloppyDiskIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import {ShareComponent} from "../../services/component.service.js";

const ShareButton = ({ componentId, type = "component" }) => {
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

    const handleShare = async () => {
        if (!componentId) return;

        try {
            const data = await ShareComponent(componentId, true);
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
            {showMenu && shareUrl && (
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

export default function Nav({title, onSave, componentId}) {
    const navigate = useNavigate();

    const handleGoBack = async (e) => {
        e.preventDefault();
        navigate("/components");
    }

    return (
        <div className={styles["nav-wrapper"]}>
            <nav className={styles["nav-container"]}>
                <div className={`${styles["nav-group"]} ${styles["left"]}`}>
                    <button className={styles["back-btn"]} onClick={handleGoBack}>
                        <ArrowLeftIcon size={16} weight="bold"/>
                    </button>
                    <h4 className={styles["nav-title"]}>{title}</h4>
                </div>
                <div className={`${styles["nav-group"]} ${styles["right"]}`}>
                    <button className={`${styles["btn"]} ${styles["save"]}`} onClick={onSave}>
                        <FloppyDiskIcon size={16}/>
                        Save
                    </button>
                    <ShareButton componentId={componentId} />
                </div>
            </nav>
        </div>
    )
}