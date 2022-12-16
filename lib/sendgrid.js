const sendEmail = async ({
    email,
    quote,
    author,
    template_id
}) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL_FROM,
        dynamic_template_data: {
            'quote': quote,
            'author': author,
        },
        template_id: template_id,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
export { sendEmail }
