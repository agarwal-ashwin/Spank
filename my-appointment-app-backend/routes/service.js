const express = require('express');
const router = express.Router();
const { isAuth } = require('../middlewares/auth');
const {
  validateServiceCreation,
  validateServiceUpdate,
} = require('../middlewares/validation/service');
const {
  createService,
  getServiceById,
  updateService,
  deleteService,
  getPopularServices,
  getNearbyServices,
} = require('../controllers/service');

// Create a new service
router.post('/create-service', isAuth, validateServiceCreation, createService);

// Get details of a specific service by ID
router.get('/service/:serviceId', getServiceById);

// Update details of a specific service by ID
router.put('/service/:serviceId', isAuth, validateServiceUpdate, updateService);

// Delete a specific service by ID
router.delete('/service/:serviceId', isAuth, deleteService);

// Get popular services
router.get('/popular-services', getPopularServices);

// Get nearby services based on user's location
router.post('/nearby-services', getNearbyServices);

module.exports = router;
