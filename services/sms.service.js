const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "0065162b",
  apiSecret: "R7yowNwjgKvsYXB8"
});


const to = "918139800530"
const text = 'A text message sent using the Vonage SMS API'

module.exports = async (to, text) => {
    const from = "Schinder";
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
