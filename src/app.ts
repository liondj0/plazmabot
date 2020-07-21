import {App} from "@slack/bolt";
import {SLACK} from "./util/secrets";
import * as Sheet from './util/sheet';
import {punish} from "./util/Commands";




const app = new App(
    {
        token: SLACK.token,
        signingSecret: SLACK.signingSecret
    }
);

app.command('/punish', async cmd => {
    await punish(app, cmd);
});


(async () => {
    await Sheet.initSheet();
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();