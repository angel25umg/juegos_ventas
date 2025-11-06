module.exports = (app) => {

  const stripe = require("../controllers/stripe.controller.js");

  const router = require("express").Router();

 

  // Endpoint para crear el pago
  router.post("/create-payment-intent", stripe.createPaymentIntent);

  // Endpoint para obtener la clave pública en tiempo de ejecución
  router.get("/public-key", stripe.getPublicKey);

 

  app.use("/api/stripe", router);

};