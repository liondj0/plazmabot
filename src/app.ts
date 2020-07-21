import {App} from "@slack/bolt";
import {GOOGLE_SHEETS, SLACK} from "./util/secrets";
import * as Sheet from './util/sheet';
import {punish, reward, count} from "./util/Commands";

console.log(1)
console.log(SLACK);
console.log(SLACK, GOOGLE_SHEETS)

const app = new App(
    {
        token: SLACK.token,
        signingSecret: SLACK.signingSecret
    }
);

app.command('/punish', async cmd => {
    await punish(app, cmd);
});

app.command('/reward', async cmd => {
    await reward(app, cmd);
});

app.command('/plazma-count', async cmd => {
    await count(app, cmd);
});

(async () => {
    console.log('here')
    await Sheet.initSheet();
    console.log('here2')
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();