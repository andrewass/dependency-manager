import {exec} from 'child_process';
import {ApplicationDependencies} from "./model/ApplicationDependencies.js";
import {promisify} from "util";


const asyncExec = promisify(exec)

async function getApplicationDependencies(): Promise<ApplicationDependencies> {
    const {stdout, stderr} = await asyncExec("npm ls --json --all");
    if (stderr) {
        console.log(`stderror : ${stderr}`);
    }
    return JSON.parse(stdout);
}

async function main() {
    const applicationDependencies = await getApplicationDependencies();
}

main().catch(error => console.log(error));
