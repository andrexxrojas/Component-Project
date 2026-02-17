import styles from "./ComponentGrid.module.css";
import {
    CodeIcon,
} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

const ComponentBox = ({component, shareId}) => {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate(`/shared/project/${shareId}/component/${component._id}`);
    }

    return (
        <div className={styles["component-box"]}  onClick={handleNavigate}>
            <div className={styles["component-header"]}>
                <div className={styles["logo-container"]}>
                    <CodeIcon size={24}/>
                </div>
            </div>
            <div className={styles["component-info"]}>
                <h4 className={styles["component-title"]}>{component.title}</h4>
                <div className={`${styles["preview-container"]} ${component.imageUrl ? styles["has-image"] : ""}`}>
                    {component.imageUrl ? (
                        <img src={component.imageUrl} alt="component preview image"/>
                    ) : (
                        <span className={styles["empty-preview-txt"]}>Empty Preview</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function ComponentGrid({ components = [], shareId }) {

    return (
        <div className={styles["grid-container"]}>
            {components.map((component) => (
                <ComponentBox
                    key={component._id}
                    component={component}
                    shareId={shareId}
                />
            ))}
        </div>
    )
}