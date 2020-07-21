import * as Sheet from "./sheet";
import {SLACK} from "./secrets";
import {App} from "@slack/bolt";

export const punish = async (app: App, cmd: any) => {
    const text = cmd.body.text;
    const data = text.split(', ');
    await Sheet.addRow(data, 'punishment');

    await app.client.chat.postMessage({
        token: cmd.context.botToken,
        text: `${data[0]} owes one more čokoplazma for ${data[1]}`,
        channel: SLACK.channel!,
        link_names: true
    });
    await cmd.ack('Čokoplazma succesfully added!')
}

export const reward = async (app: App, cmd: any) => {
    const text = cmd.body.text;
    const data = text.split(', ');
    await Sheet.addRow(data, 'reward');

    await app.client.chat.postMessage({
        token: cmd.context.botToken,
        text: `${data[0]} is owed one more čokoplazma for ${data[1]}`,
        channel: SLACK.channel!,
        link_names: true
    });
    await cmd.ack('Čokoplazma succesfully added!')
}

export const count = async (app: App, cmd: any) => {
    const user = cmd.body.text;
    const userBalance = await Sheet.getUserBalance(user);
    await cmd.ack(`This user has a balance of: ${userBalance}`)
}
