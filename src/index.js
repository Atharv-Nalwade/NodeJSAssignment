import { authorize } from "./credentials.js";
import { listLabelsAndSendReplies } from "./gmail.js";

async function main() {
  try {

    const authClient = await authorize(); // Authorize the client
    await listLabelsAndSendReplies(authClient); // List labels and send replies to unread messages

    console.log("Task completed successfully.");

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function repeatSequence() {
  main();

  const interval = Math.floor(Math.random() * (120 - 45 + 1) + 45); // Calculate a random interval between 45 and 120 seconds
  setTimeout(repeatSequence, interval * 1000);
}

// Start the sequence
repeatSequence();

