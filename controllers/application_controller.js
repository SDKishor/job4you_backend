import { Application } from "../models/application_model.js";
import { Job } from "../models/job_model.js";

export const applyjob = async(req,res)=>{
  try {
    const userId=req.id;
    const jobId = req.params.id;
    
    
    if(!jobId){
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }

    const exitingApplication = await Application.findOne({job:jobId, applicant:userId});

    if(exitingApplication){
      return res.status(400).json({
        message: "you have already applied for this jobs",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if(!job){
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    } 

    const newApplication = await Application.create({
      job:jobId,
      applicant:userId
    })
    job.applications.push(newApplication._id)
    
    await job.save();
    return res.status(200).json({
      message: "job applied successfully",
      job,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
}

export const getapplyjobs = async(req,res)=>{
  try {
    const userId=req.id;
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
      path: "job",
      options:{sort:{createdAt:-1}},
      populate:{
        path:"company",
        options:{sort:{createdAt:-1}},
      }
    });
    if(!application){
      return res.status(400).json({
        message: "No Applications",
        success: false,
      });
    }

    
    return res.status(200).json({
      application,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
}

export const getapplicant = async(req,res)=>{
  try {
    const jobId = req.params.id;
    console.log(jobId);
    
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options:{sort:{createdAt:-1}},
      populate:{
        path: "applicant",
      }
  })
    
    if(!job){
      return res.status(400).json({
        message: "No job found",
        success: false,
      });
    }

    
    return res.status(200).json({
      job,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
}

export const updateStatus = async(req,res)=>{
  try {
    const {status}=req.body;
    const applicationId=req.params.id;
    if(!status){
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    const application = await Application.findOne({
      _id:applicationId
    })
    
    if(!application){
      return res.status(400).json({
        message: "No application found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save()

    return res.status(200).json({
      application,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
}