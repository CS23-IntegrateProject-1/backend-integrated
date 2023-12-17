// stripe.js (routes)
const express = require('express');
const Stripe = require('stripe');

require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const cartItems = req.body.cartItems;

  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd', // Change the currency as needed
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
