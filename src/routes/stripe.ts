// import { Request, Response } from 'express';
// import stripe from 'stripe';

// // Replace 'sk_test_...' with your actual secret key
// const stripeSecretKey = 'sk_test_51OFf98BCLtNTpQNyJKiknfWUhqRZoF6SJa6zymmaQAVCtwnSoydmxZ6PzYg5OkyniCJe9GIrlxB8J1l0sYeqCEY400mOZap4J5';
// const stripeInstance = stripe(stripeSecretKey);

// const YOUR_DOMAIN = 'https://your-domain.com'; // Replace with your actual domain

// app.post('/create-checkout-session', async (req: Request, res: Response) => {
//   const session = await stripeInstance.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });
