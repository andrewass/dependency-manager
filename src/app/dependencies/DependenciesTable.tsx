"use client";

import {Table, TableBody, TableColumn, TableHeader} from "@nextui-org/react";
import {Application} from "@/app/model/Application";

interface Props{
    application: Application
}

export default function DependenciesTable({application}: Props){
    return(
        <Table>
            <TableHeader>
                <TableColumn key={1}>
                    Checkbox
                </TableColumn>
                <TableColumn key={2}>
                    Package
                </TableColumn>
                <TableColumn key={3}>
                    Current
                </TableColumn>
                <TableColumn key={4}>
                    Wanted
                </TableColumn>
                <TableColumn key={5}>
                    Latest
                </TableColumn>
            </TableHeader>
            <TableBody items={}>

            </TableBody>
        </Table>
    );
}
