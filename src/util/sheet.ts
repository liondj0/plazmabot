import {GoogleSpreadsheet} from "google-spreadsheet";
import {GOOGLE_SHEETS} from "./secrets";

let doc: GoogleSpreadsheet;

export const initSheet = async () => {
    doc = new GoogleSpreadsheet(GOOGLE_SHEETS.sheetId!);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.setHeaderRow(['user', 'date', 'reason', 'link', 'type']);
};


export const addRow = async (data: string[], type: string) => {
    const sheet = doc.sheetsByIndex[0];
    const row = {
        user: data[0],
        date: new Date(),
        reason: data[1],
        link: data[2],
        type: type
    };
    //@ts-ignore
    await sheet.addRows([row]);
}