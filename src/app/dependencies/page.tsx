import {Application} from "@/app/model/Application";
import DependenciesLeftMenu from "@/app/dependencies/DependenciesLeftMenu";
import {Dependency} from "@/app/model/Dependency";
import {execAsync} from "@/app/util/exec";
import DependenciesTable from "@/app/dependencies/DependenciesTable";

interface ApplicationDependenciesResponse {
    version: string
    name: string
    dependencies: Record<string, DependencyVersion>
}

interface DependencyVersion {
    version: string,
}

interface OutdatedDependency {
    current: string,
    wanted: string,
    latest: string
}

interface OutdatedDependenciesResponse {
    outdatedDeps: Record<string, OutdatedDependency>
}

function mapToApplication(
    application: ApplicationDependenciesResponse,
    outdatedDependencies: OutdatedDependenciesResponse
): Application {
    const dependencies: Dependency[] = Object.entries(application.dependencies).map(([name, dependency]): Dependency => {
        const outdatedDep = outdatedDependencies[name]
        if (outdatedDep) {
            return {
                package: name,
                current: outdatedDep.current,
                wanted: outdatedDep.wanted,
                latest: outdatedDep.latest
            }
        } else {
            return {
                package: name,
                current: dependency.version,
                wanted: dependency.version,
                latest: dependency.version
            }
        }
    });
    return {
        name: application.name,
        version: application.version,
        dependencies: dependencies
    }
}

async function getApplicationDependencies(): Promise<Application> {
    const [appDepRespose, outdatedDepResponse] = await Promise.all([
        execAsync("npm list --json --depth=0"),
        execAsync("npm outdated --json")
    ]);
    const applicationResponse: ApplicationDependenciesResponse = JSON.parse(appDepRespose);
    const outdatedDependencies: OutdatedDependenciesResponse = JSON.parse(outdatedDepResponse);

    return mapToApplication(applicationResponse, outdatedDependencies);
}

export default async function DependencyPage() {
    const application = await getApplicationDependencies();

    return (
        <div className="flex flex-row">
            <div className="basis-1/5">
                <DependenciesLeftMenu/>
            </div>
            <div className="basis-4/5">
                <DependenciesTable application={application}/>
            </div>
        </div>
    );
}
