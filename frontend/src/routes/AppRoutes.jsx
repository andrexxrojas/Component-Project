import {Routes, Route} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {ProtectedRoute, PublicRoute} from "../components/RouteGuards/RouteGuards";

// Pages
import Auth from "../pages/Auth/Auth.jsx";
import Editor from "../pages/Editor/Editor.jsx";
import Landing from "../pages/Landing/Landing.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import ProjectView from "../pages/ProjectView/ProjectView.jsx";
import MyComponents from "../pages/MyComponents/MyComponents.jsx";
import SharedComponent from "../pages/SharedComponent/SharedComponent.jsx";
import SharedProject from "../pages/SharedProject/SharedProject.jsx";
import SharedProjectComponent from "../pages/SharedProjectComponent/SharedProjectComponent.jsx";

export default function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <Landing />
                    </PublicRoute>
                }/>
                <Route path="/auth" element={
                    <PublicRoute>
                        <Auth />
                    </PublicRoute>
                }/>
                <Route path="/projects" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }/>
                <Route path="/components" element={
                    <ProtectedRoute>
                        <MyComponents />
                    </ProtectedRoute>
                }/>
                <Route path="/projects/:id" element={
                    <ProtectedRoute>
                        <ProjectView />
                    </ProtectedRoute>
                }/>
                <Route path="/editor/:id" element={
                    <ProtectedRoute>
                        <Editor />
                    </ProtectedRoute>
                }/>
                <Route path="/shared/component/:shareId" element={
                    <SharedComponent />
                }/>
                <Route path="/shared/project/:shareId" element={
                    <SharedProject />
                }/>
                <Route path="/shared/project/:shareId/component/:componentId" element={
                    <SharedProjectComponent />
                }/>
                <Route path="*" element={
                    <PublicRoute>
                        <NotFound />
                    </PublicRoute>
                }/>
            </Routes>
        </Layout>
    )
}