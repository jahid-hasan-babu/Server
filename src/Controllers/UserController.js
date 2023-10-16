const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const OTPModel = require('../Models/OTPModels')
const sentEmailUtility = require("../utility/sendEmailUtility")
require('dotenv').config()


exports.registration = async (req, res) => {
    let reqBody = req.body
    try {
        const result = await userModel.create(reqBody)
        res.status(200).json({status:"success",data:result})
    } catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}

exports.login = async (req, res) => {
    try {
        let reqBody = req.body
        let result = await userModel.find(reqBody).count()
        if(result === 1){
            let Payload = {
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data:reqBody['email']
            }
             let token=jwt.sign(Payload,process.env.SERECTKEY)
             res.status(200).json({status:"Success",data:token})
        }else{
            res.status(200).json({status:"fail",data:"No user found"})
        }

    } catch (error) {
       res.status(200).json({status:"fail",data:error}) 
    }
}





exports.ProfileUpdate = async (req,res) => {
   
    try{
        let email = req.headers['email'];
        let reqBody = req.body;
        let result=await userModel.updateOne({email: email}, reqBody)
        res.status(200).json({status:"success",data:result})
    }catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}

exports.profileDetails = async (req, res) =>{
    try {
        let email= req.headers['email'];
        let result= await userModel.find({email:email});
        res.status(200).json({status:"success",data:result})
    }
    catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}


exports.recoveryEmail = async (req, res) =>{
    
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your Verification Code is ="+OTPCode
    let EmailSubject="Task manager verification code"

    let result= await userModel.find({email:email}).count();
    if(result===1){
       await sentEmailUtility(email,EmailText,EmailSubject);
       await OTPModel.create({email:email,otp:OTPCode})
       res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})

    }
    else{
        res.status(200).json({status:"fail",data:"No User Found"})
    }
}


exports.RecoverVerifyOTP=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    if(result===1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status}, {status:statusUpdate})
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }

}



exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result===1){
        let result=await userModel.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }
}
