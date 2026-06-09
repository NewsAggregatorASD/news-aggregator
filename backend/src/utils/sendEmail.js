import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (
  to,
  subject,
  html
) => {
  console.log(
    "sendEmail called:",
    to
  );

  const response =
    await resend.emails.send({
      from:
        "News Aggregator <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

  console.log(
    "Resend response:",
    response
  );

  return response;
};
export default sendEmail;