module.exports = (app) => {

  const stripe = require("../controllers/stripe.controller.js");

  const router = require("express").Router();

 

  // Endpoint para crear el pago

  router.post("/create-payment-intent", stripe.createPaymentIntent);

 

  app.use("/api/stripe", router);

};