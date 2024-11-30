const {Router} = require("express");
const courseRouter = Router();
const {courseModel, purchaseModel} = require("../db/db");
const {auth,JWT_USER_PASSWORD} =require("../auth/auth");

courseRouter.post("/purchase",auth,async(req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;

    const existingPurchase = await purchaseModel.findOne({ userId, courseId });
    if (existingPurchase) {
        return res.status(400).json({ message: "You have already purchased this course" });
    }

    //should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })
     res.json({
        message:"You have successfully bought the course"
    })
});
courseRouter.get("/preview",async(req,res)=>{
    const courses = await courseModel.find({});

     res.json({
        courses
    })

});
    

module.exports= {
    courseRouter : courseRouter
};