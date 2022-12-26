import cors from 'cors'
import sgMail from '@sendgrid/mail'
import express from 'express';
import corsOptions from '../middleware/corsOptions.js';
import dotenv from 'dotenv';

dotenv.config();

const emailRouter = express.Router();

emailRouter.options("*", cors());
emailRouter.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Send Email 
emailRouter.post("/sendEmail",cors(corsOptions), async (req, res)=>{
    const newEmail = req.body;
    console.log(newEmail);
    await sgMail.send({
        to: newEmail.email,
        from: 'gbhattarai55@gmail.com',
        subject: newEmail.subject,
        text: newEmail.body
    })
    res.status(200).send({'mssg':'Email sent successfully!'})
  })

  export default emailRouter;