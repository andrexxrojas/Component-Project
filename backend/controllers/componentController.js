import Component from "../models/component.js";
import Project from "../models/project.js";

// HELPER FUNCTION
const generateShareId = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
};

// [POST] Generate a share url for component
export const shareComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPublic } = req.body;

        const existingComponent = await Component.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!existingComponent) {
            return res.status(404).json({ message: "Component not found" });
        }

        let shareId = existingComponent.shareId;

        if (!shareId) {
            shareId = generateShareId();
        }

        const component = await Component.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id
            },
            {
                isPublic: isPublic ?? true,
                shareId: shareId
            },
            { new: true }
        );

        const shareUrl = `${process.env.FRONTEND_URL}/shared/component/${component.shareId}`;

        res.status(200).json({
            shareUrl,
            component: {
                title: component.title,
                files: component.files,
                isPublic: component.isPublic
            }
        });
    } catch (error) {
        console.error("Error sharing component:", error);
        res.status(500).json({ message: "Error sharing component:", error: error.message });
    }
};
// [GET] Get the shared component
export const getSharedComponent = async (req, res) => {
    try {
        const { shareId } = req.params;

        const component = await Component.findOne({
            shareId,
            visibility: "public"
        }).populate('userId', 'username');

        if (!component) {
            return res.status(404).json({ message: "Shared component not found" });
        }

        res.status(200).json({
            title: component.title,
            files: component.files,
            owner: component.userId?.username || 'Unknown',
            createdAt: component.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching shared component:", error });
    }
};

// [POST] Create new component
export const newComponent = async (req, res) => {
    try {
        const {title, files, visibility} = req.body;

        const componentFiles = {
            css: files?.css || `.wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}`,

            js: files?.js || `const WelcomeMessage = () => {
  return (
    <div className="wrapper">
      <h1 className="title">Hello there!</h1>
      <p>This is a sample component to get you started.</p>
    </div>
  );
};`,
        };

        const newComponent = new Component({
            userId: req.user.id,
            title,
            files: componentFiles,
            visibility: visibility || "public",
        });

        await newComponent.save();
        res.status(201).json({message: "Component saved", component: newComponent});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error saving component", error});
    }
};

// [PUT] Save (update) existing component
export const saveComponent = async (req, res) => {
    try {
        const {id} = req.body;
        const {title, files, visibility, imageUrl} = req.body;

        const updated = await Component.findOneAndUpdate(
            {_id: id, userId: req.user.id},
            {title, files, visibility, imageUrl},
            {new: true}
        );

        if (!updated) {
            return res.status(404).json({message: "Component not found or unauthorized"});
        }

        res.status(200).json({message: "Component saved", component: updated});
    } catch (error) {
        res.status(500).json({message: "Error saving component", error});
    }
}

// [DELETE] Delete a component
export const deleteComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);

        if (!component) return res.status(404).json({message: "Component not found"});

        // Remove this component from any projects that contain it
        await Project.updateMany(
            { components: req.params.id },
            {
                $pull: { components: req.params.id },
                $inc: { componentCount: -1 },
                lastUpdated: Date.now()
            }
        );

        res.status(200).json({message: "Component deleted successfully"});
    } catch (error) {
        console.error("Error deleting component:", error);
        res.status(500).json({message: "Error deleting component:", error: error.message});
    }
};

// [GET] Get all components
export const getComponents = async (req, res) => {
    try {
        const components = await Component.find({userId: req.user.id}).sort({updatedAt: -1});

        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({message: "Error fetching components:", error});
    }
}

// [GET] Get a specific component
export const getComponent = async (req, res) => {
    try {
        const component = await Component.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!component) {
            return res.status(404).json({message: "Component not found or unauthorized access."});
        }

        res.status(200).json(component);
    } catch (error) {
        res.status(500).json({message: "Error fetching component:", error});
    }
}