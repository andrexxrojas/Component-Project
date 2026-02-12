import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        components: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Component",
            },
        ],
        componentCount: {
            type: Number,
            default: 0,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
    },
    {timestamps: true}
)

projectSchema.pre("save", function (next) {
    this.componentCount = this.components.length;
    this.lastUpdated = Date.now();
    next();
});

export default mongoose.model("Project", projectSchema);