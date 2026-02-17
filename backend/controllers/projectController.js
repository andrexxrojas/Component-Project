import Project from "../models/project.js";
import Component from "../models/component.js";

// HELPER FUNCTION
const generateShareId = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
};

// [POST] Create new project
export const newProject = async (req, res) => {
    try {
        const {title, description, components, visibility} = req.body;

        const newProject = new Project({
            userId: req.user.id,
            title,
            description: description || "",
            components: components || [],
            visibility: visibility || "public",
        });

        await newProject.save();
        res.status(201).json({message: "Project created:", project: newProject});
    } catch (error) {
        res.status(500).json({message: "Error creating project:", error});
    }
};

// [PUT] Update existing project
export const updateProject = async (req, res) => {
    try {
        const {id, title, description, visibility} = req.body;

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (visibility !== undefined) updateFields.visibility = visibility;

        const updated = await Project.findOneAndUpdate(
            {_id: id, userId: req.user.id},
            updateFields,
            {new: true}
        );

        if (!updated) {
            return res
                .status(404)
                .json({message: "Project not found or unauthorized"});
        }

        res.status(200).json({message: "Project updated", project: updated});
    } catch (error) {
        res.status(500).json({message: "Error updating project", error});
    }
};

// [DELETE] Delete a project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!project)
            return res.status(404).json({message: "Project not found or unauthorized"});

        res.status(200).json({message: "Project deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting project", error});
    }
};

// [GET] Get all projects for the logged-in user
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({userId: req.user.id})
            .populate("components", "title visibility")
            .sort({updatedAt: -1});

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({message: "Error fetching projects", error});
    }
};

// [GET] Get a single project by ID
export const getProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).populate("components", "title visibility files");

        if (!project)
            return res.status(404).json({message: "Project not found or unauthorized"});

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({message: "Error fetching project", error});
    }
};

// [PUT] Add a component to a project
export const addComponentToProject = async (req, res) => {
    try {
        const {projectId, componentId} = req.body;

        const project = await Project.findOneAndUpdate(
            {_id: projectId, userId: req.user.id},
            {$addToSet: {components: componentId}},
            {new: true}
        ).populate("components");

        if (!project) {
            return res.status(404).json({message: "Project not found or unauthorized"});
        }

        project.componentCount = project.components.length;
        await project.save();

        res.status(200).json({message: "Component added", project});
    } catch (error) {
        res.status(500).json({message: "Error adding component to project", error});
    }
}

// [PUT] Remove a component from a project
export const removeComponentFromProject = async (req, res) => {
    try {
        const {projectId, componentId} = req.body;

        const project = await Project.findOneAndUpdate(
            {_id: projectId, userId: req.user.id},
            {$pull: {components: componentId}},
            {new: true}
        ).populate("components");

        if (!project) {
            return res.status(404).json({message: "Project not found or unauthorized"});
        }

        project.componentCount = project.components.length;
        await project.save();

        res.status(200).json({message: "Component removed from project", project})
    } catch (err) {
        res.status(500).json({message: "Error removing component from project"});
    }
}

// [POST] Share an entire project
export const shareProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPublic } = req.body;

        const existingProject = await Project.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        let shareId = existingProject.shareId;

        if (!shareId) {
            shareId = generateShareId();
            console.log("Generated new shareId:", shareId);
        } else {
            console.log("Using existing shareId:", shareId);
        }

        const project = await Project.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id
            },
            {
                visibility: isPublic ? "public" : "private",
                shareId: shareId
            },
            { new: true, runValidators: true }
        );

        console.log("Updated project:", {
            id: project._id,
            title: project.title,
            visibility: project.visibility,
            shareId: project.shareId,
            componentIds: project.components
        });

        let components = [];
        if (project.components && project.components.length > 0) {
            components = await Component.find({
                _id: { $in: project.components }
            });
        }
        else {
            components = await Component.find({
                projectId: project._id
            });
        }

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const shareUrl = `${frontendUrl}/shared/project/${project.shareId}`;

        res.status(200).json({
            shareUrl,
            project: {
                title: project.title,
                description: project.description,
                visibility: project.visibility,
                componentCount: project.componentCount || components.length,
                components: components.map(c => ({
                    title: c.title,
                    files: c.files
                }))
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error sharing project:",
            error: error.message
        });
    }
};

// [GET] Get shared project
export const getSharedProject = async (req, res) => {
    try {
        const { shareId } = req.params;

        const project = await Project.findOne({
            shareId,
            visibility: "public"
        }).populate('userId', 'username');

        if (!project) {
            return res.status(404).json({ message: "Shared project not found or is private" });
        }

        let components = [];
        if (project.components && project.components.length > 0) {
            components = await Component.find({
                _id: { $in: project.components }
            }).select('title files createdAt');
        } else {
            components = await Component.find({
                projectId: project._id
            }).select('title files createdAt');
        }

        res.status(200).json({
            title: project.title,
            description: project.description,
            owner: project.userId?.username || 'Unknown',
            createdAt: project.createdAt,
            components: components.map(c => ({
                title: c.title,
                files: c.files,
                createdAt: c.createdAt
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching shared project:",
            error: error.message
        });
    }
};