import {exec} from "child_process";

export function execAsync(command: string) {
    return new Promise(function (resolve, reject) {
        exec(command, (error, stdout, stderr) => {
            if (stderr !== "") {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}
