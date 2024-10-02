import {Dependency} from "./Dependency.js";

export interface ApplicationDependencies {
    version: string
    name: string
    dependencies: Record<string, Dependency>
}
