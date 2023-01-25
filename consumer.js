const amqp = require("amqplib");

receiveMessage();

async function receiveMessage() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const receivedMessage = JSON.parse(message.content.toString());
            console.log(" [x] Received '%s'", receivedMessage);

            channel.ack(message);
        });

        console.log("Waiting for messages...");
    } catch (ex) {
        console.error(ex);
    }
}