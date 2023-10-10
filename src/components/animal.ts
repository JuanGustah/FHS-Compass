import { Component } from "./base-component";
import { Animal } from "../models/animal";

export class AnimalComponent extends Component{
    private animal:Animal;

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        animal:Animal
    ){
        super(templateElement,injectableElement,injectAtStart); 
        this.animal = animal;
        this.drawAnimal();
    }

    private drawAnimal(){
        let img = this.element.querySelector("img")!;
        img.src = `./assets/${this.animal.imgAssetsSrc}`;
        img.alt = this.animal.altImgText;

        this.element.querySelector("h3")!.textContent = this.animal.name;
    }
}