import { Component } from "./base-component";

export class AdoptionInfoComponent extends Component{
    adoptButtonElement:HTMLButtonElement;

    constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        modalAdopt:HTMLDialogElement,
    ){
        super(templateElement,injectableElement,injectAtStart);
        this.adoptButtonElement = this.element.querySelector(".adopt-alternative-button")! as HTMLButtonElement;
        this.adoptButtonElement.addEventListener("click",()=>{modalAdopt.showModal()})
    }
}