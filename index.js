const fs = require("fs");
const path = require("path");

sock.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0];

    if (!msg.message) return;

    const jid = msg.key.remoteJid;

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;

    console.log("رسالة:", text);

    // أمر ping
    if (text === ".ping") {

        await sock.sendMessage(jid, {
            text: "pong 🟢"
        });
    }

    // أمر صورة
    if (text === ".صوره") {

        const folder = "./images";

        const files = fs.readdirSync(folder);

        if (files.length === 0) {
            return sock.sendMessage(jid, {
                text: "لا توجد صور"
            });
        }

        const random =
            files[Math.floor(Math.random() * files.length)];

        const filePath = path.join(folder, random);

        await sock.sendMessage(jid, {
            image: fs.readFileSync(filePath),
            caption: "📷 صورة"
        });
    }

    // أمر صوت
    if (text === ".صوت") {

        const folder = "./audio";

        const files = fs.readdirSync(folder);

        if (files.length === 0) {
            return sock.sendMessage(jid, {
                text: "لا توجد صوتيات"
            });
        }

        const random =
            files[Math.floor(Math.random() * files.length)];

        const filePath = path.join(folder, random);

        await sock.sendMessage(jid, {
            audio: fs.readFileSync(filePath),
            mimetype: "audio/mp4",
            ptt: true
        });
    }

    // أمر اصوات
    if (text === ".اصوات") {

        const folder = "./sounds";

        const files = fs.readdirSync(folder);

        if (files.length === 0) {
            return sock.sendMessage(jid, {
                text: "لا توجد أصوات"
            });
        }

        const random =
            files[Math.floor(Math.random() * files.length)];

        const filePath = path.join(folder, random);

        await sock.sendMessage(jid, {
            audio: fs.readFileSync(filePath),
            mimetype: "audio/mp4",
            ptt: true
        });
    }

});