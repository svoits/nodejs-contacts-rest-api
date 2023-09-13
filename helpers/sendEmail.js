require("dotenv").config();
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const { MAILGUN_DOMAIN, MAILGUN_API_KEY } = process.env;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,
});

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "'Serhii Voitsekhovskyi' <at0miqbs@gmail.com>",
  };
  await mg.messages.create(MAILGUN_DOMAIN, email);

  return true;
};

module.exports = sendEmail;
