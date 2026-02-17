import styles from "./HeaderControls.module.css";

export default function HeaderControls({title, description}) {
    return (
        <div className={styles["header-container"]}>
            <div className={styles["header-info-wrapper"]}>
                <div className={styles["header-info"]}>
                    <h1 className={styles["header-title"]}>{title}</h1>
                    <p className={styles["header-subtitle"]}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}