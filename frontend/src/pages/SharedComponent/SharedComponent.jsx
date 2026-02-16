import styles from "./SharedComponent.module.css";
import {useParams} from "react-router-dom";
import {GetSharedComponent} from "./services/component.service.js";
import {useEffect, useState} from "react";
import EditorGrid from "./components/EditorGrid/EditorGrid.jsx";
import Nav from "./components/Nav/Nav.jsx";

export default function SharedComponent() {
    const { shareId } = useParams();
    const [component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSharedComponent = async () => {
            try {
                const data = await GetSharedComponent(shareId);
                setComponent(data);
            } catch (err) {
                console.error("Component not found or is private");
            } finally {
                setLoading(false);
            }
        };

        if (shareId) {
            void fetchSharedComponent();
        }
    }, [shareId]);

    useEffect(() => {
        console.log(component);
    }, [component]);

    return (
        <div className={styles["share-component-wrapper"]}>
            <Nav title={component.title}/>
            <div className={styles["editor-container"]}>
                <EditorGrid
                    code={component.files.js}
                    css={component.files.css}
                />
            </div>
        </div>
    )
}