import styles from "./Editor.module.css";
import Nav from "./components/Nav/Nav.jsx";
import EditorGrid from "./components/EditorGrid/EditorGrid.jsx";
import { useEffect, useState } from "react";
import { GetComponent, SaveComponent } from "./services/component.service.js";
import { useParams } from "react-router-dom";

export default function Editor() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [css, setCss] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComponent = async () => {
            try {
                setIsLoading(true);
                const componentData = await GetComponent(id);
                setTitle(componentData.title);
                setCode(componentData.files.js);
                setCss(componentData.files.css);
            } catch (error) {
                console.error("Failed to fetch component:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchComponent();
        }
    }, [id]);

    const saveComponent = async () => {
        try {
            const files = {
                css: css,
                js: code,
            }

            const res = await SaveComponent(id, files);
            console.log(res);
        } catch (error) {
            console.error("Failed to save component:", error);
        }
    }

    if (isLoading) {
        return (
            <div className={styles["editor-wrapper"]}>
                <Nav title="Loading..." />
                <div className={styles["editor-container"]}>
                    <div>Loading component...</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["editor-wrapper"]}>
            <Nav title={title} onSave={saveComponent}/>
            <div className={styles["editor-container"]}>
                <EditorGrid
                    code={code}
                    css={css}
                    onCodeChange={setCode}
                    onCssChange={setCss}
                />
            </div>
        </div>
    );
}