const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

// create client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// show QR code
client.on("qr", (qr) => {
  console.log("Scan this QR code with WhatsApp:");
  qrcode.generate(qr, { small: true });
});

// when bot ready
client.on("ready", () => {
  console.log("WhatsApp Bot Ready 🚀");

  // friend's number (replace with your friend's number)
  const number = "919325511351@c.us"; 

  // function to send message
  async function sendMessage(text) {
    try {
      await client.sendMessage(number, text);
      console.log("✅ Message sent:", text);
    } catch (error) {
      console.log("❌ Error sending message:", error);
    }
  }

  // schedule message at 10:05 PM
 cron.schedule("0 10 * * *", () => {  // minute 0, hour 10
  console.log("Sending scheduled message at 10:00 AM...");
  sendMessage("Good morning! ☀️");
});
});

// start client
client.initialize();