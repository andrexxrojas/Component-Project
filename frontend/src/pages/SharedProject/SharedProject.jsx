import styles from "./SharedProject.module.css";
import {GetSharedProject} from "./services/project.service.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function SharedProject() {
    const { shareId } = useParams();
    const [project, setProject] = useState(null);
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSharedProject = async () => {
            try {
                const data = await GetSharedProject(shareId);
                setProject(data);
            } catch (err) {
                console.error("Component not found or is private");
            } finally {
                setLoading(false);
            }
        }

        if (shareId) {
            void fetchSharedProject();
        }
    }, [shareId]);

    useEffect(() => {
        console.log(project);
    }, [project]);

    if (loading) {
        return (
            <div className={styles["shared-project-wrapper"]}>

            </div>
        )
    }

    return (
        <div className={styles["shared-project-wrapper"]}>

        </div>
    )
}