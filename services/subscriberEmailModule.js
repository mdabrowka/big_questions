var subscriberEmail = (email) => {
  return {
    from: "martadabrowka@gmail.com",
    to: email,
    subject: "Welcome to The Big Questions of our time",
    text: "Congratulations, you have successfully subscribed to The Big Questions of Our Time."
  }
}

module.exports = subscriberEmail;
