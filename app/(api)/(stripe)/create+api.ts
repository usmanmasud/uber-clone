import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function Post(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || email || amount) {
    return new Response(
      JSON.stringify({
        error: "Please enter a valid email address",
        status: 400,
      })
    );
  }

  let customer;

  const doesCustomerExists = await stripe.customers.list({ email });

  if (doesCustomerExists.data.length > 1) {
    customer = doesCustomerExists.data[0];
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
    });

    customer = newCustomer;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    })
  );
}
