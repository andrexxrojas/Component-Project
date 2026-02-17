import styles from "./sharedProjectComponent.module.css";
import Nav from "../SharedComponent/components/Nav/Nav.jsx";
import EditorGrid from "../SharedComponent/components/EditorGrid/EditorGrid.jsx";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {GetSharedProjectComponent} from "./services/component.service.js";

export default function SharedProjectComponent() {
    const { shareId, componentId } = useParams();
    const [component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComponent = async () => {
            try {
                const data = await GetSharedProjectComponent(shareId, componentId);
                console.log(data);
                setComponent(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        void fetchComponent();
    }, [shareId, componentId]);



    if (loading) {
        return (
            <div className={styles["shared-component-wrapper"]}>

            </div>
        )
    }

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