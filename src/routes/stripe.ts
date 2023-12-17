// server.js

const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIP_KEY);

// app.use(express.json());

// app.post('/create-checkout-session', async (req, res) => {
//     try {
        
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Stubborn Attachments',
//               images: ['https://i.imgur.com/EHyR2nP.png'],
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success?success=true',
//       cancel_url: 'http://localhost:3000/cancel?canceled=true',
//         });

//         res.json({ id: session.id });
//     } catch (error: any) {
//         console.error('Error creating checkout session:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


export const createCheckoutSession = async (req: Request, res: any) => {
    
    // const { priceId } = req.body;
    const priceId = 'price_1OFtzuBCLtNTpQNy5d50ybcQ';
    // See https://stripe.com/docs/api/checkout/sessions/create
    // for additional parameters to pass.
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
        success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/canceled.html',
      });
  
      res.redirect(303, session.url);
    } catch (e:any) {
      res.status(400);
      return res.send({
        error: {
          message: e.message,
        }
      });
    }
  }