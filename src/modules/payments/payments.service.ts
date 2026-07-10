import { Stripe } from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { PaymentStatus } from "../../../generated/prisma/client";

const createpayment = async (userId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        payments: true,
      },
    });

    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: config.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config.app_url}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.app_url}/payment?success=false`,
      metadata: {
        userId: user.id,
      },
    });
    // Save payment in database
    await tx.payment.create({
      data: {
        userId: user.id,

        transactionId: session.id,
        stripeCustomerId,
        status:"COMPLETED",
      },
    });

    return {
      paymentUrl: session.url,
      sessionId: session.id,
    };
  });
  return {
    paymentUrl: transactionResult.paymentUrl,
    sessionId: transactionResult.sessionId,
  };
};

const handleStripeWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret,
  );

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session: Stripe.Checkout.Session = event.data.object;

      const userId = session.metadata?.userId as string;
      const stripeCustomerId = session.customer as string;
      const stripeSubscriptionId = session.subscription as string;

      if (!userId || !stripeCustomerId || !stripeSubscriptionId) {
        throw new Error("Webhook failed");
      }

      await prisma.payment.upsert({
        where: {
          userId,
        },

        create: {
          userId,
          stripeCustomerId,
          stripeSubscriptionId,
          status: "COMPLETED",
        },
        update: {
          stripeCustomerId,
          stripeSubscriptionId,
          status: "COMPLETED",
        },
      });

      break;
    }
    case "customer.subscription.created":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case "customer.subscription.updated":
      break;
    default:
      // Unexpected event type
      console.log(`No evet mached. Unhandled event type ${event.type}.`);
      break;
  }
};

const getPaymentHistory = async (userId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      userId,
    },
    include: {
      booking: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};

const getPaymentDetails = async (paymentId: string, userId: string) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId,
    },
    include: {
      booking: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};


export const paymentService = {
  createpayment,
  handleStripeWebhook,
  getPaymentHistory,
  getPaymentDetails
};


