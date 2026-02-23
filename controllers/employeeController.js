const Employee = require("../models/Employee");

// CREATE
exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

// READ ALL
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

// READ ONE
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    next(err);
  }
};

// SEARCH
exports.searchEmployees = async (req, res, next) => {
  try {
    const { name, department } = req.query;
    let query = {};

    if (name) query.fullName = { $regex: name, $options: "i" };
    if (department) query.department = department;

    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};