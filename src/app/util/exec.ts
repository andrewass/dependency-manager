import {exec} from "child_process";
import {spawn} from "node:child_process";

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

export function spawnNpm(operation: string, dependencies: string[]){
    return new Promise((resolve, reject) => {
        const npmOp = spawn("npm.cmd",[operation, ...dependencies]);
        let output = "";
        let error = "";

        npmOp.stdout.on("data", (data) => {
            output += data.toString();
        });

        npmOp.stderr.on("data", (data) => {
            error += data.toString();
        });

        npmOp.on("close", (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new Error(`Process exited with code ${code}: ${error}`));
            }
        });
    })
}
