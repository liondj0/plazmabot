import {GoogleSpreadsheet, GoogleSpreadsheetRow} from "google-spreadsheet";
import {GOOGLE_SHEETS} from "./secrets";

let doc: GoogleSpreadsheet;

export const initSheet = async () => {
    doc = new GoogleSpreadsheet(GOOGLE_SHEETS.sheetId!);
    await doc.useServiceAccountAuth({
        client_email: GOOGLE_SHEETS.email!,
        private_key: GOOGLE_SHEETS.privateKey!,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.setHeaderRow(['user', 'date', 'reason', 'link', 'type']);
};


export const addRow = async (data: string[], type: string) => {
    const sheet = doc.sheetsByIndex[0];
    const row = {
        user: data[0]?.trim(),
        date: new Date(),
        reason: data[1]?.trim(),
        link: data[2]?.trim(),
        type: type
    };
    //@ts-ignore
    await sheet.addRows([row]);
}

export const getUserBalance = async (user: string) => {
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const userRows = rows.filter(row => row.user === user);
    let userBalance = 0;
    userRows.forEach(u => u.type === 'reward' ? --userBalance : ++userBalance)
    return userBalance
};