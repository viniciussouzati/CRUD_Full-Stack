import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
        password: {
            type: String,
            required: true 
        },
        photo: {
            type: String // Caminho da foto do usuário
        }
    }
);

export default mongoose.model('User', userSchema);
