const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update;

        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'open') {
            console.log('البوت اشتغل');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];

        if (!msg.message || !msg.key.remoteJid) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            '';

        const jid = msg.key.remoteJid;

        // أمر .صوره
        if (text === '.صوره') {
            const folder = './images';
            const files = fs.readdirSync(folder);

            if (files.length === 0) return;

            const random = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(folder, random);

            await sock.sendMessage(jid, {
                image: fs.readFileSync(filePath)
            });
        }

        // أمر .صوت
        if (text === '.صوت') {
            const folder = './audio';
            const files = fs.readdirSync(folder);

            if (files.length === 0) return;

            const random = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(folder, random);

            await sock.sendMessage(jid, {
                audio: fs.readFileSync(filePath),
                mimetype: 'audio/mp4',
                ptt: true
            });
        }

        // أمر .اصوات
        if (text === '.اصوات') {
            const folder = './sounds';
            const files = fs.readdirSync(folder);

            if (files.length === 0) return;

            const random = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(folder, random);

            await sock.sendMessage(jid, {
                audio: fs.readFileSync(filePath),
                mimetype: 'audio/mp4',
                ptt: false
            });
        }
    });
}

startBot();