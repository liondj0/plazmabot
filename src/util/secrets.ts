import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const ENVIRONMENT = process.env.NODE_ENV || "development";
const fileName = `.env.${ENVIRONMENT}`;

if (fs.existsSync(fileName)) {
    console.log(`Got env variables from ${fileName}`);
    dotenv.config({ path: fileName });
} else {
    console.log(`${fileName} not found, trying with env variables`);
}

const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SLACK = {
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    channel: process.env.SLACK_BOT_CHANNEL
};

export const GOOGLE_SHEETS = {
    sheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n')
};