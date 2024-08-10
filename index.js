import express from 'express';
import 'dotenv/config'
import initApp from './src/initApp.js';
const app = express();
const PORT  = process.env.PORT || 3000;
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    if (event.type == 'checkout.session.completed') {
    
        const checkoutSessionCompleted = event.data.object;
        console.log('create order....')
        // Then define and call a function to handle the event checkout.session.completed
    }
    else{
      // ... handle other event types
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  
initApp(app,express);
app.listen(PORT,()=>{
    console.log(`success connected at ${PORT}`)
})