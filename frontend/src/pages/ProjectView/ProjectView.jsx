import styles from "./ProjectView.module.css";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";
import HeaderControls from "./components/HeaderControls/HeaderControls.jsx";
import ComponentGrid from "./components/ComponentGrid/ComponentGrid.jsx";
import { GetProject } from "./services/project.service.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectView() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        void fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const data = await GetProject(id);
            setProject(data);
        } catch (err) {
            console.error("Error fetching project:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleComponentCreated = async (newComponent) => {
        setProject(prev => ({
            ...prev,
            components: [newComponent, ...(prev.components || [])]
        }));
    };

    const handleComponentUpdated = (updatedComponent) => {
        setProject(prev => ({
            ...prev,
            components: prev.components.map(c =>
                c._id === updatedComponent._id ? updatedComponent : c
            )
        }));
    };

    const handleComponentDeleted = (deletedId) => {
        setProject(prev => ({
            ...prev,
            components: prev.components.filter(c => c._id !== deletedId)
        }));
    };

    const handleComponentRemoved = (removedId) => {
        setProject(prev => ({
            ...prev,
            components: prev.components.filter(c => c._id !== removedId)
        }));
    }

    if (loading) {
        return (
            <div className={styles["project-view-wrapper"]}>
                <AuthenticatedNav />
                <SideNavWrapper>
                    <div className={styles["loading-state"]}>Loading project...</div>
                </SideNavWrapper>
            </div>
        );
    }

    return (
        <div className={styles["project-view-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <HeaderControls
                    title={project.title}
                    description={project.description || "No description provided"}
                    projectId={project._id}
                    onComponentCreated={handleComponentCreated}
                    hasComponents={project.components.length > 0}
                />
                <ComponentGrid
                    components={project.components || []}
                    projectId={project._id}
                    onComponentUpdated={handleComponentUpdated}
                    onComponentDeleted={handleComponentDeleted}
                    onComponentRemoved={handleComponentRemoved}
                />
            </SideNavWrapper>
        </div>
    );
}