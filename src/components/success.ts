import { Router } from "../router/router";
import { Component } from "./base-component";

export class SuccessComponent extends Component{
    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        router:Router
    ){
        super(templateElement,injectableElement,injectAtStart); 
        this.element.querySelector("button")!.addEventListener("click",()=>{
            router.route("home")
        })
    }
}