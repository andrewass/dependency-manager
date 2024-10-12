"use client";

import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Application} from "@/app/model/Application";
import {Dependency} from "@/app/model/Dependency";

interface Props {
    application: Application
}

const columns = [
    {
        key: "package",
        label: "Package"
    },
    {
        key: "current",
        label: "Current"
    },
    {
        key: "wanted",
        label: "Wanted"
    },
    {
        key: "latest",
        label: "Latest"
    }
]

export default function DependenciesTable({application}: Props) {
    return (
        <Table
            removeWrapper
            isStriped
            className={"pr-16 pt-8"}
            aria-label="Table of all the applications dependencies"
            selectionMode="multiple"
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={application.dependencies}>
                {(item: Dependency) => (
                    <TableRow key={item.package}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
