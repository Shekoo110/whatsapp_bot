const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');

const fs = require("fs");
const path = require("path");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('البوت اشتغل');
});

client.on('message', async message => {

    // ===== .صوره =====
    if (message.body === '.صوره') {

        const folder = './images';

        const files = fs.readdirSync(folder);

        const random =
            files[Math.floor(Math.random() * files.length)];

        const imagePath =
            path.join(folder, random);

        const media =
            MessageMedia.fromFilePath(imagePath);

        await client.sendMessage(
            message.from,
            media
        );
    }

    // ===== .صوت =====
    if (message.body === '.صوت') {

        const folder = './audio';

        const files = fs.readdirSync(folder);

        const random =
            files[Math.floor(Math.random() * files.length)];

        const audioPath =
            path.join(folder, random);

        const media =
            MessageMedia.fromFilePath(audioPath);

        await client.sendMessage(
            message.from,
            media,
            { sendAudioAsVoice: false }
        );
    }

    // ===== .اصوات =====
    if (message.body === '.اصوات') {

        const folder = './sounds';

        const files = fs.readdirSync(folder);

        if (files.length === 0) {
            await message.reply('لا توجد اصوات');
            return;
        }

        for (const file of files) {

            const audioPath =
                path.join(folder, file);

            const media =
                MessageMedia.fromFilePath(audioPath);

            await client.sendMessage(
                message.from,
                media,
                { sendAudioAsVoice: false }
            );
        }
    }

});

client.initialize();