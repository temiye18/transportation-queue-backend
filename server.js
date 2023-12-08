import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Queue from "./model/Queue.js";
import Planner from "./model/Planner.js";
import bodyParser from "body-parser";

dotenv.config();
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3500;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/getCustomers", async (req, res) => {
  try {
    const customers = await Queue.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: "failed to find customers" });
  }
});

app.get("/api/getPlanners", async (req, res) => {
  try {
    const planners = await Planner.find();
    res.status(200).json(planners);
  } catch (error) {
    res.status(404).json({ message: "failed to find customers" });
  }
});

app.post("/api/addCustomer", async (req, res) => {
  const { date, slot } = req.query;

  try {
    // Check if a document with the provided date already exists
    const existingRecord = await Planner.findOne({ date });

    if (existingRecord) {
      res
        .status(409)
        .json({ message: "Entry already exists for the given date." });
    } else {
      // If no document with the date exists, create a new record
      const newPlannerData = req.body;
      const newPlannerEntry = new Planner({
        date,
        [slot]: newPlannerData,
      });

      await newPlannerEntry.save();

      res.status(201).json({ message: "New entry created successfully." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.patch("/api/updateCustomer/:date", async (req, res) => {
  const { date } = req.params;
  const { slot } = req.query;

  try {
    // Find the document with the provided date
    const existingRecord = await Planner.findOne({ date });

    if (!existingRecord) {
      return res
        .status(404)
        .json({ message: "Record not found for the given date." });
    }

    existingRecord[slot] = req.body;

    await existingRecord.save();

    res.status(200).json({ message: "Record updated successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
