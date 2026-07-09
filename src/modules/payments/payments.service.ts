import { Stripe } from "stripe"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"

const createpayment=async ( userId : string)=>{

 const transactionResult = await prisma.$transaction(async(tx)=>{

    const user = await tx.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        include: {
                payments: true
            }
    })

//     let stripeCustomerId = user.payments?.stripeCustomerId;


//   if(!stripeCustomerId) {
    
//     const customer = await stripe.customers.create({
//         email: user.email,
//         name: user.name,
//         metadata: {
//             userId: user.id
//         }
//     })
//     stripeCustomerId = customer.id;
//   }


const session = await stripe.checkout.sessions.create({
    line_items: [
        {
            price: config.stripe_price_id,
            quantity: 1
        }
    ],
    payment_method_types: ['card'],
    mode: "subscription",
    success_url: `${config.app_url}/payment?success=true`,
    cancel_url: `${config.app_url}/payment?success=false`,
    
})
return session.url;



 })
 return {
    paymentUrl: transactionResult
 };
}

const handleStripeWebhook = async (payload: Buffer, signature: string) => {
const endpointSecret = config.stripe_webhook_secret;
const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);

// Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
    //   const paymentIntent = event.data.object;
    console.log(event.data.object);
    const session : Stripe.Checkout.Session= event.data.object;
    
    

      break;
    case 'customer.subscription.created':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
      case 'customer.subscription.updated':
        break;
    default:
      // Unexpected event type
      console.log(`No evet mached. Unhandled event type ${event.type}.`);
      break;
  }

}

export const paymentService = {
    createpayment,
    handleStripeWebhook
}
