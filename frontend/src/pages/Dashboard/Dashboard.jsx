import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";
import HeaderControls from "./components/HeaderControls/HeaderControls.jsx";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid.jsx";
import { GetProjects } from "./services/project.service.js";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        void fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await GetProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProjectCreated = (newProject) => {
        setProjects(prev => [newProject, ...prev]);
    };

    const handleProjectUpdated = (updatedProject) => {
        setProjects(prev =>
            prev.map(p => p._id === updatedProject._id ? updatedProject : p)
        );
    };

    const handleProjectDeleted = (deletedId) => {
        setProjects(prev => prev.filter(p => p._id !== deletedId));
    };

    return (
        <div className={styles["dashboard-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <HeaderControls onProjectCreated={handleProjectCreated} />
                <ProjectGrid
                    projects={projects}
                    loading={loading}
                    onProjectUpdated={handleProjectUpdated}
                    onProjectDeleted={handleProjectDeleted}
                />
            </SideNavWrapper>
        </div>
    );
}