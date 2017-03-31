import { Set } from "typescript-collections";
import * as uml from "../uml/index";
import { AbstractFormatter } from "./formatter";

/**
 * PlantUML Formatter
 *
 * http://plantuml.com
 *
 * @export
 * @class Formatter
 * @extends {AbstractFormatter}
 */
export class Formatter extends AbstractFormatter {

    public generateClassDiagram(umlCodeModel: uml.CodeModel): string {
        let content: string;
        content = this._formatNodes(umlCodeModel);
        content += "\n";
        content += this._formatLinks(umlCodeModel);
        return `@startuml\n${content}\n@enduml\n`;
    }

    private _formatNodes(umlCodeModel: uml.CodeModel): string {
        const content: string[] = [];
        umlCodeModel.nodes.forEach((key, node) => {
            if (node instanceof uml.Class) {
                switch (node.stereotype) {
                    case uml.Stereotype.Interface:
                        content.push(`interface ${node.name}`);
                        break;
                    case uml.Stereotype.None:
                    default:
                        content.push(`class ${node.name}`);
                        break;
                }
            }
        });

        return content.join("\n");
    }

    private _formatLinks(umlCodeModel: uml.CodeModel): string {
        const content: string[] = [];
        umlCodeModel.generalizations.forEach((link) => {
            content.push(`${link.toName} <|-- ${link.fromName}`);
        });

        return content.join("\n");
    }
}