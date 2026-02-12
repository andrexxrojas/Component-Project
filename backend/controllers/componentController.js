import Component from "../models/component.js";

// [POST] Create new component
export const newComponent = async (req, res) => {
    try {
        const {title, files, visibility} = req.body;

        // Ensure files object exists with default template
        const componentFiles = {
            html: files?.html || `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Sandbox</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="app"></div>
    <script src="script.js"></script>
  </body>
</html>`,
            css: files?.css ?? " ", // empty string by default
            js: files?.js || `export default function App() {
  return (
    <h1>Hello World</h1>
  )
}`,
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

        res.status(200).json({message: "Component deleted successfully"});
    } catch (error) {
        res.status(500).json("Error deleting component:", error)
    }
}

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