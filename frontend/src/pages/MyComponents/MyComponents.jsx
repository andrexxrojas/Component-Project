import styles from "./MyComponents.module.css";
import { useState, useEffect } from "react";
import AuthenticatedNav from "../../components/AuthenticatedNav/AuthenticatedNav.jsx";
import SideNavWrapper from "../../components/SideNavWrapper/SideNavWrapper.jsx";
import HeaderControls from "./components/HeaderControls/HeaderControls.jsx";
import ComponentGrid from "./components/ComponentGrid/ComponentGrid.jsx";
import { GetComponents } from "./services/component.service.js";

export default function MyComponents() {
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        void fetchComponents();
    },[])

    const fetchComponents = async () => {
        try {
            const data = await GetComponents();
            setComponents(data);
        } catch (error) {
            console.error("Error fetching components:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleComponentCreated = (newComponent) => {
        setComponents(prev => [newComponent, ...prev]);
    }

    const handleComponentUpdated = (updatedComponent) => {
        setComponents(prev =>
            prev.map(c => c._id === updatedComponent._id ? updatedComponent : c)
        );
    }

    const handleComponentDeleted = (deletedId) => {
        setComponents(prev => prev.filter(c => c._id !== deletedId));
    }

    return (
        <div className={styles["my-components-wrapper"]}>
            <AuthenticatedNav />
            <SideNavWrapper>
                <HeaderControls onComponentCreated={handleComponentCreated}/>
                <ComponentGrid
                    components={components}
                    loading={loading}
                    onComponentUpdated={handleComponentUpdated}
                    onComponentDeleted={handleComponentDeleted}
                />
            </SideNavWrapper>
        </div>
    )
}