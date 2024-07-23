import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "m4JestykPraiser"
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        shortBio: {
            type: String,
            maxLength: 150,
            default: "Hey! I'm on the Project-A!!",
        },
        fullBio: {
            type: String,
            maxLength: 3000,
            default: "Know more about me :)",
        },
        interests: {
            type: [String],
            default: ["myself", "atharv", "myself", "atharv"],
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);