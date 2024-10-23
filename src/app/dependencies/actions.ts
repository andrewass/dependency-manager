"use server";

import {spawnNpm} from "@/app/util/exec";

export async function updateDependencies(dependencies: string[]){
    if(dependencies.length > 0){
        await spawnNpm("update", dependencies)
    } else {
        await spawnNpm("update", [])
    }
}
