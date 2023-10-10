import { Component } from "./base-component";

export class HomeComponent extends Component{
    donateButtonElement:HTMLButtonElement;
    adoptButtonElement:HTMLButtonElement;

    constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        modalDonate:HTMLDialogElement,
        modalAdopt:HTMLDialogElement,
    ){
        super(templateElement,injectableElement,injectAtStart);

        this.donateButtonElement = this.element.querySelector(".donate-button")! as HTMLButtonElement;
        this.adoptButtonElement = this.element.querySelector(".adopt-button")! as HTMLButtonElement;

        this.donateButtonElement.addEventListener("click",()=>{modalDonate.showModal()})
        this.adoptButtonElement.addEventListener("click",()=>{modalAdopt.showModal()})
    }
}