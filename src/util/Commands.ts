import * as Sheet from "./sheet";
import {SLACK} from "./secrets";
import {App} from "@slack/bolt";

const punish = async (app: App, cmd: any) => {
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

export {punish}