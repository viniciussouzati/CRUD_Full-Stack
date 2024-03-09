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
        profilePicture: {
            type: String 
        }
    }
);

const User = mongoose.model('User', userSchema);

class UserRepository {
    async createUser(name, email, linkedin, password, profilePicture) {
        try {
            const user = new User({ name, email, linkedin, password, profilePicture });
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw error;
        }
    }

}

export default UserRepository;
