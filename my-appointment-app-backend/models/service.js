const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  providerName: {
    type: String,
    required: true,
  },
  providerJobTitle: {
    type: String,
    required: true,
  },
  providerEmployer: {
    type: String,
    required: true,
  },
  imageUrl: String, // Assuming this is the URL for the provider's image
  serviceType: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    name:{
        type: String,
        required: true,
    }
  },
  // Add other fields as needed for your services
});

// Index the location field for geospatial queries
serviceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Service', serviceSchema);
