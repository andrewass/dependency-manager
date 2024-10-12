import {Dependency} from "./Dependency.js";

export interface Application {
    version: string
    name: string
    dependencies: Dependency[]
}
