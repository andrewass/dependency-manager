"use client";

import {Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Application} from "@/app/model/Application";
import {Dependency} from "@/app/model/Dependency";
import {Key, ReactNode, useState} from "react";
import {DependencyHeaderActionMenu, DependencyRowActionMenu} from "@/app/dependencies/DependencyRowActionMenu";

interface Props {
    application: Application
}

const columns = [
    {key: "package", label: "Package"},
    {key: "current", label: "Current"},
    {key: "wanted", label: "Wanted"},
    {key: "latest", label: "Latest"},
    {key: "actions", label: "Actions"}
]

function renderBodyCell(dependency: Dependency, columnKey: Key): ReactNode {
    switch (columnKey) {
        case "package":
            return <p>{dependency.package}</p>;
        case "current":
            return <p>{dependency.current}</p>;
        case "wanted":
            return <p>{dependency.wanted}</p>;
        case "latest":
            return <p>{dependency.latest}</p>;
        default:
            return <DependencyRowActionMenu/>;
    }
}

export default function DependenciesTable({application}: Props) {

    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    function updateSelectedRows(keys: Selection) {
        if (keys === "all") {
            setSelectedRows([keys])
        } else {
            setSelectedRows(Array.from(keys) as string[])
        }
    }

    return (
        <Table
            removeWrapper
            className={"pr-16 pt-8"}
            aria-label="Table of all the applications dependencies"
            selectionMode="multiple"
            onSelectionChange={(keys: Selection) => updateSelectedRows(keys)}
        >
            <TableHeader columns={columns}>
                {(column) =>
                    <TableColumn key={column.key}>
                        {column.label === "Actions"
                            ? <DependencyHeaderActionMenu/>
                            : <p>{column.label}</p>
                        }
                    </TableColumn>
                }
            </TableHeader>
            <TableBody items={application.dependencies}>
                {(item: Dependency) => (
                    <TableRow key={item.package}>
                        {(columnKey) => <TableCell>{renderBodyCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
