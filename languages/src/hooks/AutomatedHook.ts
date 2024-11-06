import { Node, AbstractNodeHook, LanguageFilesRegistry, Container, ResizeBounds } from '@cinco-glsp/cinco-glsp-api';
import { MetaSpecification, getGraphSpecOf } from '@cinco-glsp/cinco-glsp-common';
import { Point } from 'sprotty-protocol';

export const HEADER_HEIGHT: number = 20;
export const FOOTER_HEIGHT: number = 20;
export const IO_HEIGHT: number = 20;
export const LABEL_HEIGHT: number = 50
export const PADDING: number = 5

const map = {
    "siblibrary:input":IO_HEIGHT,
    "siblibrary:label": LABEL_HEIGHT,
    "siblibrary:output": IO_HEIGHT,
    "siblibrary:branch" : IO_HEIGHT
}


export class AutomatedHook extends AbstractNodeHook {
    override CHANNEL_NAME: string | undefined = 'AutomatedHook [' + this.modelState.root.id + ']';

   
    override postCreate(node: Node): void {
        node.setProperty("name", 'automated')
        node.setProperty("label", 'Automated')

        const image = node as Container
        var delta = 0

        var input = new Node() as Node;
        input.type = "siblibrary:input";
        input.position = { x : 0, y : HEADER_HEIGHT };
        input.size =  { width: node.size.width, height: IO_HEIGHT };
        input.initializeProperties();
        delta = (input.position.y + input.size.height + PADDING);

        var label = new Node() as Node;
        label.type = "siblibrary:label";
        label.position = { x : 0, y : delta}
        label.size =  { width: node.size.width, height: LABEL_HEIGHT };
        label.initializeProperties();
        label.setProperty('icon', 'icons/service.png');
        label['_attributes']['icon'] = 'icons/service.png';

        label.setProperty('name', image.getProperty('name'));
        label.setProperty('label', image.getProperty('label'));
        delta = (label.position.y + label.size.height + PADDING);

        var output = new Node();
        output.type = "siblibrary:output";
        output.position = { x : 0, y : delta }
        output.size =  { width: node.size.width, height: IO_HEIGHT };
        output.initializeProperties();
        delta = (output.position.y + output.size.height + PADDING);


        image.containments.push(input,output,label);
        image.size.height = (delta + FOOTER_HEIGHT)
    }

    override postMove(node: Node, oldPosition?: Point | undefined): void {
        
    }

    override postResize(node: Node, resizeBounds: ResizeBounds): void {
        layout(node as Container);
    }
}



export function layout(sib : Container, ignore? : Node) {
        
    const width = sib.size.width;

    // const nodes = sib.containments.sort((a, b) => a.position.y - b.position.y);
    // parition into inputs, outputs and labels

    // Sort alphabetically by type, then numerically by y
    const nodes = sib.containments.sort((a, b) => {
        const result = a.type.localeCompare(b.type);
        if (result !== 0) {
        return result; 
        }
        return a.position.y - b.position.y;
    });

    var delta = HEADER_HEIGHT

    for (let node of nodes) {
        // do not layout ignored slot
        if (node == ignore)
            continue;
        
        // make slot as wide as slottable
        node.size = {
            width: width,
            height: map[node.type]
        }

        // and put into correct position
        node.position = {
            x : 0,
            y : delta
        }

        delta += (map[node.type] + PADDING)
    }

    delta += FOOTER_HEIGHT

    sib.size = {
        width : width,
        height: delta
    }
}


LanguageFilesRegistry.register(AutomatedHook);
