import { google } from "googleapis";

function createRawMessage(to, subject, message) {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const utf8Message = Buffer.from(message, "utf-8").toString("base64");
  const rawMessage = [
    `Content-Type: text/html; charset=utf-8`,
    `MIME-Version: 1.0`,
    `Content-Transfer-Encoding: base64`,
    `to: ${to}`,
    `subject: ${utf8Subject}`,
    ``,
    `${utf8Message}`,
  ].join("\n");

  return Buffer.from(rawMessage).toString("base64");
}

export default createRawMessage;
