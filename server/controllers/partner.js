const knex = require('../database');

/* --- Employees --- */
exports.getEmployees = (req, res) =>
  knex('employees')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(409).json(err));

exports.createEmployee = (req, res) =>
  knex('employees')
    .insert({ ...req.body })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));

exports.updateEmployee = (req, res) => {
  const id = req.params.id;

  return knex('employees')
    .where({ id })
    .first()
    .update({ ...req.body })
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};

exports.deleteEmployee = (req, res) => {
  const id = req.params.id;

  return knex('employees')
    .where({ id })
    .first()
    .del()
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};