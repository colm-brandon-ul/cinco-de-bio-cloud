import { Node, AbstractNodeHook, LanguageFilesRegistry, Container, ResizeBounds } from '@cinco-glsp/cinco-glsp-api';
import { MetaSpecification, getGraphSpecOf } from '@cinco-glsp/cinco-glsp-common';
import { Point } from 'sprotty-protocol';


export class AutomatedHook extends AbstractNodeHook {
    override CHANNEL_NAME: string | undefined = 'AutomatedHook [' + this.modelState.root.id + ']';

   
    override postCreate(node: Node): void {
        node.setProperty("name", 'automated')
        node.setProperty("label", 'Automated')
        this.notify(node.toJSON())

        const input = new Node();
        const label = new Node()
        const output = new Node();
        
        const image = node as Container

        input.position = { x : 0, y : 10 }
        input.size =  { width: node.size.width, height: 20 }
        input.type = "siblibrary:input";
        input.setProperty('name', 'myInput')
        input.setProperty('typeName', 'MyType')

        label.position = { x : 0, y : 10 + 30 }
        label.size =  { width: node.size.width, height: 20 }
        label.type = "siblibrary:label";


        output.position = { x : 0, y : node.size.height -30 }
        output.size =  { width: node.size.width, height: 20 }
        output.type = "siblibrary:output";
        

        image.containments.push(input,output,label);

    }

    override postMove(node: Node, oldPosition?: Point | undefined): void {
        
    }

    override postResize(node: Node, resizeBounds: ResizeBounds): void {
        // layout(node as Container);
    }
}


LanguageFilesRegistry.register(AutomatedHook);
