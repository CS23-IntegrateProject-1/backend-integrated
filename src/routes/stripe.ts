const express = require('express');
const Stripe = require('stripe');

require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "thb",
                product_data: {
                    name: item.name,
                    Images: [item.images],
                    description: item.desc,
                    metadata: {
                        Id: item.id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity,
        };
});

const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
});

res.send({ url: session.url });
});

// router.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'T-shirt',
//                     },
//                     unit_amount: 2000,
//                 },
//                 quantity: 1,
//             },
//         ],
//         mode : 'payment',
//         success_url: `${process.env.CLIENT_URL}/checkout-success`,
//         cancel_url: `${process.env.CLIENT_URL}/cart`,
// });
//         res.send({ url: session.url });

