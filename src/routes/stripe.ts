// Import necessary modules and types from Stripe
import Stripe from 'stripe';
import express, { Request, Response } from 'express';

// Replace 'your-secret-key' with your actual secret API key from Stripe
const stripe = new Stripe('sk_test_51OFf98BCLtNTpQNyJKiknfWUhqRZoF6SJa6zymmaQAVCtwnSoydmxZ6PzYg5OkyniCJe9GIrlxB8J1l0sYeqCEY400mOZap4J5');

const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:8080';

app.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1OFtzuBCLtNTpQNy5d50ybcQ',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4242, () => console.log('Running on port 8080'));
