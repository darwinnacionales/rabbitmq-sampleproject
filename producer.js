const amqp = require("amqplib");

sendMessage();

async function sendMessage() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");

        const msg = {
            number: +process.argv[2]
        }

        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
    } catch (ex) {
        console.error(ex);
    }
}