import {App} from "@slack/bolt";
import {SLACK} from "./util/secrets";


const app = new App(
    {
        token: SLACK.token,
        signingSecret: SLACK.signingSecret
    }
);


(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();