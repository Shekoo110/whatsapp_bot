const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");
const path = require("path");

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

        if (connection === "close") {

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                startBot();
            }

        } else if (connection === "open") {

            console.log("البوت اشتغل ✅");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        const jid = msg.key.remoteJid;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        console.log("رسالة:", text);

        // ping
        if (text === ".ping") {

            await sock.sendMessage(jid, {
                text: "pong 🟢"
            });
        }

        // صورة
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

        // صوت
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

        // اصوات
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
}

startBot();