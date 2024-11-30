const bcrypt = require("bcrypt"); // For hashing passwords
const { Router } = require("express"); // To create a new Express Router instance
const adminRouter = Router(); // Create a router for admin-related routes
const { adminModel, courseModel } = require("../db/db"); // Importing database models
const { z } = require("zod"); // Zod library for schema validation
const jwt = require("jsonwebtoken"); // For creating and verifying JWT tokens
const { auth, JWT_ADMIN_PASSWORD } = require("../auth/authAdmin"); // Custom authentication middleware and secret key

// Admin sign-up route
adminRouter.post("/signup", async (req, res) => {
  // Validate incoming request body using Zod
  const requiredBody = z.object({
    email: z.string().min(3).max(50).email(), // Valid email format
    password: z
      .string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/), // Password must have lowercase, uppercase, digit, and special character
    firstName: z.string().min(3).max(100), // First name validation
    lastName: z.string().min(3).max(100), // Last name validation
  });

  // Perform validation
  const validation = requiredBody.safeParse(req.body);
  if (!validation.success) {
    // Return 400 response if validation fails
    return res.status(400).json({
      message: "Invalid input data",
      error: validation.error,
    });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    // Hash the password using bcrypt
    const hashpassword = await bcrypt.hash(password, 5);

    // Save admin details to the database
    await adminModel.create({
      email,
      password: hashpassword,
      firstName,
      lastName,
    });

    // Respond with success message
    res.json({ message: "You are signed up" });
  } catch (e) {
    // Catch and handle any errors during signup
    return res.json({
      message: "Invalid signup",
    });
  }
});

// Admin sign-in route
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Find admin by email
  const response = await adminModel.findOne({
    email: email,
  });
  if (!response) {
    // If no admin found, return 403
    return res.status(403).json({
      message: "Invalid user",
    });
  }

  // Compare entered password with the hashed password
  const passwordMatch = bcrypt.compare(password, response.password);

  if (passwordMatch) {
    // Generate JWT token on successful authentication
    const token = jwt.sign(
      {
        id: response._id.toString(), // Include admin ID in the token
      },
      JWT_ADMIN_PASSWORD // Sign the token with a secret key
    );

    // Respond with the token
    res.json({
      token,
    });
  } else {
    // Return 403 if credentials are invalid
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});

// Create a course (protected route)
adminRouter.post("/course", auth, async (req, res) => {
  const adminId = req.userId; // Extract user ID from auth middleware
  const { title, description, price, imageUrl } = req.body;

  // Create a new course in the database
  const course = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId, // Link the course to the admin
  });

  // Respond with course creation message
  return res.json({
    message: "Course created",
    courseId: course._id,
  });
});

// Update a course (protected route)
adminRouter.put("/course", auth, async (req, res) => {
  const adminId = req.userId; // Extract user ID from auth middleware
  const { title, description, price, imageUrl, courseId } = req.body;

  // Update the course in the database
  const course = await courseModel.updateOne(
    {
      _id: courseId, // Find by course ID
      creatorId: adminId, // Ensure the course belongs to the admin
    },
    {
      title,
      description,
      price,
      imageUrl, // Update fields
    }
  );

  // Respond with course update message
  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

// Get all courses created by the admin (protected route)
adminRouter.get("/course/bulk", auth, async (req, res) => {
  const adminId = req.userId; // Extract user ID from auth middleware

  // Find all courses created by this admin
  const course = await courseModel.find({
    creatorId: adminId,
  });

  // Respond with the list of courses
  res.json({
    message: "Courses retrieved",
    course,
  });
});

// Export the admin router
module.exports = {
  adminRouter: adminRouter,
};
