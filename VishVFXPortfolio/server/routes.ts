import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import { z } from "zod";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using the contact schema
      const contactData = contactSchema.parse(req.body);
      
      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'vishwaszsoni@gmail.com',
        subject: `New Contact Form Submission - ${contactData.projectType}`,
        text: `
Name: ${contactData.name}
Email: ${contactData.email}
Project Type: ${contactData.projectType}
Message: ${contactData.message}
        `
      });
      
      // Store contact submission in memory
      const result = await storage.storeContactSubmission(contactData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: result.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
