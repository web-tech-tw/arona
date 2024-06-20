import config from "./src/config";

import {
    MatrixAuth,
} from "matrix-bot-sdk";

import inquirer from "inquirer";

const {
    homeserverUrl,
} = config.bridgeProvider.matrix;

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

console.info(
    "Get the AccessToken from Matrix",
    `(homeserver: ${homeserverUrl || "undefined"})`,
    "\n",
);
inquirer.prompt(questions).then(({username, password}) => {
    console.info();
    auth.passwordLogin(username, password).then((client) => {
        console.info("AccessToken:", client.accessToken);
        return client.getUserId();
    }).then((userId) => {
        console.info("User ID:", userId);
    }).catch(() => {
        console.error("Unauthorized");
    });
});
