import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if(!users){
        return next(new AppError("No users found", 404));
    }

    res.status(200).json({
        success: true,
        message: "All users found",
        data: users
    });
});

// Create a new User
const createUser = asyncHandler( async (req, res) => {
    const { name, email, age } = req.body;

    if(!name || !email || !age){
        return next(new AppError("Please provide all fields", 400));
    }

    const newUser = new User({name, email, age});

    if(!newUser){
        return next(new AppError("Failed to create new user", 400));
    }

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "New user created successfully",
        data: newUser
    });
});

// Update a user by ID
const updateUser = asyncHandler( async (req, res) => {
    const { id } = req.params;

    if(!id){
        return next(new AppError("Please provide user ID", 400));
    }

    const { name, email, age } = req.body

    if(!name || !email || !age){
        return next(new AppError("Please provide all fields", 400));
    }

    const user = await User.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true }
    )

    if(!user){
        return next(new AppError("Failed to update user", 500));
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    });
});

export {
    getUsers,
    createUser,
    updateUser
};
