import { Node, AbstractNodeHook, LanguageFilesRegistry, Container, ResizeBounds } from '@cinco-glsp/cinco-glsp-api';
import { MetaSpecification, getGraphSpecOf } from '@cinco-glsp/cinco-glsp-common';
import { Point } from 'sprotty-protocol';


export class NodeHook extends AbstractNodeHook {
    override CHANNEL_NAME: string | undefined = 'NodeHook [' + this.modelState.root.id + ']';

   
    override postCreate(node: Node): void {
        // node.setProperty("name", `${this.VERBS[this.random(0, this.VERBS.length)]} ${this.NOUNS[this.random(0, this.NOUNS.length)]}`)
    }

    override postMove(node: Node, oldPosition?: Point | undefined): void {
        
    }

    override postResize(node: Node, resizeBounds: ResizeBounds): void {
        // layout(node as Container);
    }

    override postDelete(node: Node): void {
        
    }
}


LanguageFilesRegistry.register(NodeHook);
