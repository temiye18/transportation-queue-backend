import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QueueSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Queue = mongoose.model("Queues", QueueSchema);

export default Queue;
