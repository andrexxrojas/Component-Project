import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {type: String, required: true},
        files: {
            css: {type: String, required: true},
            js: {type: String, required: true},
        },
        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
        imageUrl: {type: String, default: null},
        shareId: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    {timestamps: true}
);

export default mongoose.model("Component", componentSchema);
