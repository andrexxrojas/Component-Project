import Project from "../models/project.js";

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
            {$addToSet: {components: componentId}}, // prevents duplicates
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