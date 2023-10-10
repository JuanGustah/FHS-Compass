import { Router } from "../router/router";
import { Component } from "./base-component";

export class AdoptComponent extends Component{
    viewAdoptabelsButtonElement:HTMLButtonElement;
    adoptButtonElement:HTMLButtonElement;

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        router:Router,
        modalAdopt:HTMLDialogElement,
    ){
        super(templateElement,injectableElement,injectAtStart);

        this.viewAdoptabelsButtonElement = this.element.querySelector(".adoptables-button")! as HTMLButtonElement;
        this.adoptButtonElement = this.element.querySelector(".adopt-inverse-button")! as HTMLButtonElement;
        
        this.viewAdoptabelsButtonElement.addEventListener("click",()=>{router.route("pets")});
        this.adoptButtonElement.addEventListener("click",()=>{modalAdopt.showModal()})
    }
}