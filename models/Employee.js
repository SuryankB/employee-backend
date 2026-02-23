const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    department: {
      type: String,
      enum: ["HR", "IT", "Finance", "Marketing"],
      required: true
    },
    designation: { type: String, required: true },
    salary: { type: Number, required: true, min: 0 },
    dateOfJoining: { type: Date, required: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      required: true
    },
    status: { type: String, default: "Active" }
  },
  { timestamps: true }
);

employeeSchema.pre("save", function () {
  if (!this.employeeId) {
    this.employeeId = "EMP-" + Date.now();
  }
});

module.exports = mongoose.model("Employee", employeeSchema);