import { google } from "googleapis";
import sendReply from "./reply.js";
import createRawMessage from "./raw-message.js";
import createLabel from "./label.js";

async function listLabelsAndSendReplies(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  // Get the "UNREAD" label ID
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  
  const labels = res.data.labels;
  let unreadLabelId;

  for (const label of labels) {
    if (label.name === "UNREAD") {
      unreadLabelId = label.id;
      break;
    }
  }

  if (!unreadLabelId) {
    console.log("No 'UNREAD' label found.");
    return;
  }

  // Create the label if it doesn't exist
  const repliedLabelName = "Replied";
  let repliedLabelId;
  for (const label of labels) {
    if (label.name === repliedLabelName) {
      repliedLabelId = label.id;
      break;
    }
  }

  if (!repliedLabelId) {
    repliedLabelId = await createLabel(auth, repliedLabelName);
    console.log(
      `Label '${repliedLabelName}' created with ID: ${repliedLabelId}`
    );
  }

  // List unread messages
  const unreadRes = await gmail.users.messages.list({
    userId: "me",
    q: `label:${unreadLabelId}`,
  });

  const unreadMessages = unreadRes.data.messages;

  if (!unreadMessages || unreadMessages.length === 0) {
    console.log("No unread messages found.");
    return;
  }

  console.log("Unread Messages:");

  for (const message of unreadMessages) {
    console.log(`- Message ID: ${message.id}`);
    await sendReply(message.id, auth, repliedLabelId);
  }
}

export { listLabelsAndSendReplies };
