const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { qr, connection } = update;

        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'open') {
            console.log('البوت اشتغل!');
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

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