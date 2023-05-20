const replyMessageContent = `
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
  }

  .container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    color: #555;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .message {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
  }
</style>
</head>
<body>
<div class="container">
  <h1>Automated Reply</h1>
  <div class="message">
    <p>Thank you for your email.</p>
    <p>I am currently away on a vacation and will get back to you as soon as possible.</p>
  </div>
</div>
</body>
</html>
`;

export default replyMessageContent;
