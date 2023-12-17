// server.js

const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIP_KEY);

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success?success=true',
      cancel_url: 'http://localhost:3000/cancel?canceled=true',
        });

        res.json({ id: session.id });
    } catch (error: any) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});