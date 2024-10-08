import {Dependency} from "@/app/model/Dependency";
import {Accordion, AccordionItem} from "@nextui-org/react";

interface Props {
    dependencies: Record<string, Dependency>
    depth: number
}

export default function DependencyAccordion({dependencies, depth}: Props) {
    return (
        <Accordion selectionMode="multiple">
            {Object.entries(dependencies).map(([name, dependency]) => (
                <AccordionItem
                    key={name}
                    title={`${name} (${dependency.version})`}
                    style={{marginLeft: depth * 20}}
                >
                    {dependency.dependencies && Object.keys(dependency.dependencies).length > 0 && (
                        <DependencyAccordion dependencies={dependency.dependencies} depth={depth + 1}/>
                    )}
                </AccordionItem>
            ))}
        </Accordion>
    );
}
