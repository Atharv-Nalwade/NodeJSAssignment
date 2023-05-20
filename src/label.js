import { google } from "googleapis";

/**
 * Creates a new label in Gmail.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} labelName The name of the label to create.
 * @returns {Promise<string>} The ID of the created label.
 */
async function createLabel(auth, labelName) {
  const gmail = google.gmail({ version: "v1", auth });

  const createLabelRes = await gmail.users.labels.create({
    userId: "me",
    resource: {
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
      name: labelName,
    },
  });

  return createLabelRes.data.id;
}

export default createLabel;
