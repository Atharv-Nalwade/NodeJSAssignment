import { google } from "googleapis";
import replyMessageContent from "./reply-message.js";
import createRawMessage from "./raw-message.js";

/**
 * Lists the labels in the user's account and sends replies to unread messages.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function sendReply(messageId, auth, repliedLabelId) {
  const gmail = google.gmail({ version: "v1", auth });

  // Get the original message
  const messageRes = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
  });

  const originalMessage = messageRes.data;
  const labelIds = originalMessage.labelIds;

  if (labelIds && labelIds.includes(repliedLabelId)) {
    console.log(
      `Email with Message ID: ${messageId} has already been replied.`
    );
    return;
  }

  // Check if any previous emails were sent by you in the thread
  const threadId = originalMessage.threadId;
  const threadRes = await gmail.users.threads.get({
    userId: "me",
    id: threadId,
  });

  const threadMessages = threadRes.data.messages;

  // Check if any previous emails in the thread have the replied label
  const previousRepliedEmails = threadMessages.filter((message) => {
    const labelIds = message.labelIds;
    return labelIds && labelIds.includes(repliedLabelId);
  });

  if (previousRepliedEmails.length > 0) {
    console.log(
      `Email thread with Message ID: ${messageId} has previous replied emails.`
    );
    return;
  }

  // Extract the necessary details from the original message
  const originalSubjectHeader = originalMessage.payload.headers.find(
    (header) => header.name === "Subject"
  );
  const originalFromHeader = originalMessage.payload.headers.find(
    (header) => header.name === "From"
  );

  if (!originalSubjectHeader || !originalFromHeader) {
    console.log(
      "Error: Unable to retrieve necessary headers from the original message."
    );
    return;
  }

  const originalSubject = originalSubjectHeader.value;
  const originalFrom = originalFromHeader.value;

  // Extract your email address from the original "From" header
  const yourEmailAddress = originalFrom.match(/[^<\s]+@[^>\s]+/)[0];

  // Compose the reply message
  const replySubject = `Re: ${originalSubject}`;
  const replyTo = yourEmailAddress;
  const replyMessage = replyMessageContent;

  const replyPayload = {
    userId: "me",
    resource: {
      raw: createRawMessage(replyTo, replySubject, replyMessage),
      threadId: originalMessage.threadId,
    },
  };

  // Send the reply
  const replyRes = await gmail.users.messages.send(replyPayload);
  console.log(`Reply sent for Message ID: ${messageId}`);
  console.log(`Reply Message ID: ${replyRes.data.id}`);

  // Add label to the replied email
  const addLabelRes = await gmail.users.messages.modify({
    userId: "me",
    id: messageId,
    resource: {
      addLabelIds: [repliedLabelId],
      removeLabelIds: [],
    },
  });
  console.log(`Label added to Message ID: ${messageId}`);
}

export default sendReply;
