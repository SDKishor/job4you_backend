import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_routes.js";
import companyRoute from "./routes/company_routes.js";
import jobRoute from "./routes/job_routes.js";
import applicationRoute from "./routes/application_routes.js";

dotenv.config({})


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)


app.get("/", (req,res)=>{
    return res.status(200).json({
        message:"backend connected",
        success:true,
    })
})



app.listen(PORT, ()=>{
    connectDB();
    console.log(`server running at port ${PORT}`);
})