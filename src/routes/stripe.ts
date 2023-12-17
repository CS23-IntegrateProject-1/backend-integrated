// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OFf98BCLtNTpQNyJKiknfWUhqRZoF6SJa6zymmaQAVCtwnSoydmxZ6PzYg5OkyniCJe9GIrlxB8J1l0sYeqCEY400mOZap4J5');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1OFtzuBCLtNTpQNy5d50ybcQ',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4000'));