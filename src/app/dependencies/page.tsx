import {promisify} from "util";
import {exec} from 'child_process';
import {ApplicationDependencies} from "@/app/model/ApplicationDependencies";
import DependencyAccordion from "@/app/dependencies/DependencyAccordion";
import {Accordion, AccordionItem} from "@nextui-org/react";

const asyncExec = promisify(exec);

async function getApplicationDependencies(): Promise<ApplicationDependencies> {
    const {stdout, stderr} = await asyncExec("npm ls --json --all");
    if (stderr) {
        console.log(`stderror : ${stderr}`);
    }
    return JSON.parse(stdout);
}


export default async function DependencyPage() {
    const dependencies: ApplicationDependencies = await getApplicationDependencies();

    Object.entries(dependencies.dependencies).forEach(([key, value]) => console.log("name is " + key));
//<DependencyAccordion key={index} index={index} name={key}/>
    /*
    {Object.entries(dependencies.dependencies).slice(0, 2).map(([key, value], index) =>
                    <AccordionItem key={key}>Hello</AccordionItem>
                )}
     */
    return (
        <div>
            <DependencyAccordion dependencies={dependencies}/>
        </div>
    )

}
