import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String], // Array of two options
        validate: {
            validator: function (val) {
                return val.length === 2; // Ensure exactly 2 options
            },
            message: "There must be exactly 2 options for each question."
        },
        required: true,
    },
    correctAnswer: {
        type: String, // Must match one of the options
        required: true,
    },
});

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
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        friendRequestsRecieved: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        friendRequestsSent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        questions: {
            type: [questionSchema],
            default: [
                {
                    questionText: "What would you prefer?",
                    options: ["Dinner and a movie", "Outdoor adventure"],
                    correctAnswer: "Dinner and a movie"
                },
                {
                    questionText: "What’s your favorite type of music?",
                    options: ["Pop", "Classical"],
                    correctAnswer: "Pop"
                },
                {
                    questionText: "Are you more of a dog person or a cat person?",
                    options: ["Dog", "Cat"],
                    correctAnswer: "Dog"
                },
                {
                    questionText: "What’s your favorite way to spend a weekend?",
                    options: ["Exploring the outdoors", "Relaxing at home"],
                    correctAnswer: "Exploring the outdoors"
                },
                {
                    questionText: "Mountains or Beaches?",
                    options: ["Mpuntains", "Beaches"],
                    correctAnswer: "Mountains"
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
