import { Component } from "./base-component";

export class StatComponent extends Component{
    constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean,mainText:string, description:string){
        super(templateElement,injectableElement,injectAtStart);
        this.renderStat(mainText,description);
    }

    renderStat(mainText:string, description:string){
        this.element.firstElementChild!.textContent = mainText;
        this.element.lastElementChild!.textContent = description;
    }
}