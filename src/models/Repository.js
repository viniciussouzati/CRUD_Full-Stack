import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        linkedin: {
            type: String
        },
        userId: {
            type: String,
            required: true 
        },
        profilePicture: {
            type: String 
        }
    }
);

export default mongoose.model('Repository', repositorySchema);
