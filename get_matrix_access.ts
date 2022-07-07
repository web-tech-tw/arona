import "dotenv/config";

import {
    MatrixAuth,
} from "matrix-bot-sdk";

import {
    homeserverUrl,
} from "./src/provider/matrix";

import inquirer from "inquirer";

const auth = new MatrixAuth(homeserverUrl);

const questions = [{
    type: "input",
    name: "username",
    message: "Username: ",
}, {
    type: "password",
    name: "password",
    message: "Password: ",
}];

inquirer.prompt(questions).then(({username, password}) => {
    auth.passwordLogin(username, password).then((client) => {
        console.info(client.accessToken);
        return client.getUserId();
    }).then((userId) => {
        console.info(userId);
    }).catch(() => {
        console.error("Unauthorized");
    });
});
