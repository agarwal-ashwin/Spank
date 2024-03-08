const { body, param } = require('express-validator');

// Validation middleware for creating a new service
exports.validateServiceCreation = [
  body('serviceName').trim().notEmpty().withMessage('Service name is required'),
  body('serviceDescription').trim().notEmpty().withMessage('Service description is required'),
  body('location.coordinates')
    .isArray({ min: 2, max: 2 }).withMessage('Location coordinates must be an array of two numbers')
    .notEmpty().withMessage('Location coordinates are required'),
];

// Validation middleware for updating a service
exports.validateServiceUpdate = [
  param('serviceId').trim().notEmpty().withMessage('Service ID is required'),
  body('serviceName').optional().trim().notEmpty().withMessage('Service name is required'),
  body('serviceDescription').optional().trim().notEmpty().withMessage('Service description is required'),
  body('location.coordinates')
    .optional()
    .isArray({ min: 2, max: 2 }).withMessage('Location coordinates must be an array of two numbers')
    .notEmpty().withMessage('Location coordinates are required'),
];
