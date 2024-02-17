const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions/v2");
const stripe = require("stripe");
// const app = express();

// Load environment variables
dotenv.config();

// Initialize Stripe with the API key from environment variables
const stripeApiKey = process.env.STRIPE_KEY;
const stripeInstance = stripe(stripeApiKey);

// Set global options for Firebase Functions
setGlobalOptions({ maxInstances: 10 });

// Create an Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: true }));

// Parse JSON request bodies
app.use(express.json());

// Define a route to handle GET requests to the root URL
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// Define a route to handle POST requests to create a payment
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  try {
    if (total > 0) {
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({
        message: "Total must be greater than 0",
      });
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({
      error: "An internal server error occurred",
    });
  }
});

// Export the Express app as a Firebase HTTP function
exports.api = onRequest(app);
