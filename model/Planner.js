import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlannerSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    slot_1: {
      id: {
        type: String,
      },
      customerName: {
        type: String,
      },
      pickUpLocation: {
        type: String,
      },
      dropOffLocation: {
        type: String,
      },
    },
    slot_2: {
      id: {
        type: String,
      },
      customerName: {
        type: String,
      },
      pickUpLocation: {
        type: String,
      },
      dropOffLocation: {
        type: String,
      },
    },
    slot_3: {
      id: {
        type: String,
      },
      customerName: {
        type: String,
      },
      pickUpLocation: {
        type: String,
      },
      dropOffLocation: {
        type: String,
      },
    },
    slot_4: {
      id: {
        type: String,
      },
      customerName: {
        type: String,
      },
      pickUpLocation: {
        type: String,
      },
      dropOffLocation: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

PlannerSchema.eachPath((path) => {
  if (path.startsWith("slot_")) {
    PlannerSchema.path(path).default(null);
  }
});

const Planner = mongoose.model("Planner", PlannerSchema, "planners");

export default Planner;
