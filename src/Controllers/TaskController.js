const TaskModel = require("../Models/TasksModels")


exports.createTask = async (req, res) =>{
    try {
        let reqBody = req.body;
        reqBody.email = req.headers['email']
        let result = await TaskModel.create(reqBody)
        res.status(201).json({status:"success",data:result})
    } catch (error) {
        res.status(200).json({status:"fail",error:"Task create fail"})
    }
    
}

exports.updateTask = async (req,res) => {
    try{
        let id= req.params.id;
        let status= req.params.status;
        let Query={_id:id};
        let reqBody={status:status}

        let result= await TaskModel.updateOne(Query,reqBody)

        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.DeleteTask = async (req, res) =>{
    try {
        let id= req.params.id;
        let result=await TaskModel.deleteOne({_id:id})
        res.status(200).json({status:"success",data:result})

    }catch (error) {
        res.status(200).json({status:"fail",data:err.toString()})
    }
}

exports.listTaskByStatus=async (req,res)=>{
    try {
        let status= req.params.status;
        let email=req.headers['email'];
        let result= await TaskModel.find({email:email,status:status});
        res.status(200).json({status:"success",data:result})
    }catch (error) {
        res.status(200).json({status:"fail",data:err.toString()})
    }
}



exports.taskStatusCount=async (req,res)=>{
    try {
        let email=req.headers['email'];
        let result= await TaskModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({status:"success",data:result})
    }
    catch (error) {
        res.status(200).json({status:"fail",data:error.toString()})
    }
}
