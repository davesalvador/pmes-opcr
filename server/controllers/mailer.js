import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

//https://ethereal.email/create
{
  /** 
let nodeConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "your-@gmail.", // Your Gmail email address
    pass:"16-character password", // Your Gmail password or app-specific password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);
*/
}
let MailGenerator = new Mailgen({
  theme: "Default",
  product: {
    name: "Davetohaha",
    link: "https://mailgen.js",
  },
});

/** POST: https://localhost:8080/api/registerMail
 * @param:{
 * "username" : "example123",
 * "password" : "admin123",
 * "text": "" ,
 * "subject" : ""
 * }
 */

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Determine the email domain
  const emailDomain = userEmail.split("@")[1];

  // Configure mail transport based on the email domain
  let nodeConfig;
  if (emailDomain === "gmail.com") {
    // Gmail configuration
    nodeConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "schivarecomrade@gmail.com", // Your Gmail email address
        pass: "fddn phua kgwp mhzv", // Your Gmail password or app-specific password
      },
    };
  } else if (emailDomain === "bulsu.edu.ph") {
    // Your organization's email configuration -
    nodeConfig = {
      host: "smtp.bulsu.edu.ph",
      port: 587,
      secure: false,
      auth: {
        user: "your-organization-email@bulsu.edu.ph",
        pass: "your-organization-email-password",
      },
    };
  } else {
    return res.status(400).send({ error: "Unsupported email domain" });
  }

  const transporter = nodemailer.createTransport(nodeConfig);

  // Rest of the email generation and sending code remains the same
  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board",
      outro:
        "Need help, or have questions? Just reply to this email, We'd love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);
  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // Send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us" });
    })
    .catch((error) => res.status(500).send({ error }));
};
