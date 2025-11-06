const { secretKey, publicKey } = require("../config/stripe.config");
const Stripe = require("stripe");
const stripe = Stripe(secretKey);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // en centavos: 10 USD = 1000
      currency,
      description,
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Devuelve la clave pública para que el frontend la obtenga en tiempo de ejecución
exports.getPublicKey = async (req, res) => {
  try {
    res.json({ publicKey });
  } catch (error) {
    console.error('Error returning stripe public key', error);
    res.status(500).json({ error: 'Could not get public key' });
  }
};