import {promisify} from "util";
import {exec} from 'child_process';
import {ApplicationDependencies} from "@/app/model/ApplicationDependencies";
import ApplicationDependencyAccordion from "@/app/dependencies/ApplicationDependencyAccordion";
import DependenciesLeftMenu from "@/app/dependencies/DependenciesLeftMenu";

const asyncExec = promisify(exec);

async function getApplicationDependencies(): Promise<ApplicationDependencies> {
    const {stdout, stderr} = await asyncExec("npm ls --json --all");
    if (stderr) {
        console.log(`stderror : ${stderr}`);
    }
    return JSON.parse(stdout);
}


export default async function DependencyPage() {
    const application: ApplicationDependencies = await getApplicationDependencies();
    return (
        <div className="flex flex-row">
            <DependenciesLeftMenu/>
            <ApplicationDependencyAccordion application={application}/>
        </div>
    )
}
