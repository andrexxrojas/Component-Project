import styles from "./ComponentGrid.module.css";
import {
    CodeIcon,
} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

const ComponentBox = ({component}) => {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate(`/editor/${component._id}`);
    }


    return (
        <div className={styles["component-box"]}>
            <div className={styles["component-header"]}>
                <div className={styles["logo-container"]}>
                    <CodeIcon size={24}/>
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

export default function ComponentGrid({ components = [] }) {

    return (
        <div className={styles["grid-container"]}>
            {components.map((component) => (
                <ComponentBox
                    key={component._id}
                    component={component}
                />
            ))}
        </div>
    )
}