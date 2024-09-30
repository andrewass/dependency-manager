import { exec } from 'child_process';

function getDependencies(){
    const herll = exec("npm ls --json --all");
    console.log("JSON  "+JSON.stringify(herll));
    //console.log("Hello");
}

function main(){
    const projectDir = process.cwd();
    console.log(`Running in project directory : ${projectDir}`);

    getDependencies();
}

main();
