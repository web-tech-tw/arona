import { MatrixClient } from "matrix-bot-sdk";

export default (client: MatrixClient) => client.on("room.message", (roomId, event) => {
    if (!event["content"]) return;
    const sender = event["sender"];
    const body = event["content"]["body"];
    console.log(`${roomId}: ${sender} says '${body}`);
});
