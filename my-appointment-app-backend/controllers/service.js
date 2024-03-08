const Service = require("../models/service");

// Create a new service
exports.createService = async (req, res) => {
  try {
    const {
      providerName,
      providerJobTitle,
      providerEmployer,
      imageUrl,
      serviceType,
      popularity,
      location,
      // Add other fields as needed
    } = req.body;

    const newService = await Service.create({
      providerName,
      providerJobTitle,
      providerEmployer,
      imageUrl,
      serviceType,
      popularity,
      location,
      // Add other fields as needed
    });

    res.json({ success: true, service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a specific service by ID
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, service });
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update details of a specific service by ID
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const {
      providerName,
      providerJobTitle,
      providerEmployer,
      imageUrl,
      serviceType,
      popularity,
      location,
      // Add other fields as needed
    } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        providerName,
        providerJobTitle,
        providerEmployer,
        imageUrl,
        serviceType,
        popularity,
        location,
        // Add other fields as needed
      },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, service: updatedService });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a specific service by ID
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const deletedService = await Service.findOneAndDelete(serviceId);

    if (!deletedService) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get popular services
exports.getPopularServices = async (req, res) => {
  try {
    // Fetch popular services based on popularity in descending order
    const popularServices = await Service.find()
      .sort({ popularity: -1 }) // Sort by popularity in descending order
      .limit(10) // Adjust the limit as needed
      .select(
        "providerName providerJobTitle serviceType popularity location imageUrl providerEmployer"
      ); // Select the fields you need

    res.json({ success: true, services: popularServices });
  } catch (error) {
    console.error("Error fetching popular services:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get nearby services based on user's location
exports.getNearbyServices = async (req, res) => {
  try {
    // Assuming the user's location is available in req.user (e.g., req.user.location)
    const { longitude, latitude } = req.body;

    console.log(req.body);
    // Fetch nearby services based on user's location
    const nearbyServices = await Service.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 50000000000000000, // Maximum distance in meters (adjust as needed)
        },
      },
    })
      .limit(10) // Adjust the limit as needed
      .select(
        "providerName providerJobTitle serviceType popularity location imageUrl providerEmployer"
      ); // Select the fields you need

    res.json({ success: true, services: nearbyServices });
  } catch (error) {
    console.error("Error fetching nearby services:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
