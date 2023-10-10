import { Component } from "./base-component";
import { CardButton } from "../models/card";

export class CardComponent extends Component{
    private title:string;
    private description:string;
    private iconSrc?:string;
    private cardButton?:CardButton;

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        title:string,
        description:string,
        iconSrc?:string,
        button?:CardButton
    ){
        super(templateElement,injectableElement,injectAtStart);
        this.title = title;
        this.description = description
        this.iconSrc = iconSrc;
        this.cardButton = button;

        this.configure();
    }

    private configure(){
        let header = this.element.querySelector("header");

        header!.firstElementChild!.textContent = this.title;
        this.element.querySelector("p")!.textContent = this.description;
        
        if(this.iconSrc){
            let img = document.createElement("img");
            img.src = `./assets/${this.iconSrc}`;
            header!.insertAdjacentElement("beforeend",img);
        }

        if(this.cardButton){
            let button = document.createElement("button");
            button.style.backgroundColor = this.cardButton.backgroundColor;
            button.style.color= this.cardButton.textColorIsDark?"#1E1F27":"#fff";
            button.textContent = this.cardButton.label;
            
            if(this.cardButton.clickFunction){
                button.addEventListener("click",this.cardButton.clickFunction);
            }

            this.element.appendChild(button);
        }
    }
}