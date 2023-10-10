import { Component } from "./base-component";
import { AnimalComponent } from "./animal";
import { Animal } from "../models/animal";
import { Router } from "../router/router";

export class PetsComponent extends Component{
    private _animalCollection: Animal[];

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean, 
        animalCollection: Animal[],
        router:Router
    ){
        super(templateElement,injectableElement,injectAtStart); 
        this._animalCollection = animalCollection;

        this.drawAnimals();
        this.element.querySelector("button")!.addEventListener("click",()=>{
            router.route("home")
        })
    }

    private drawAnimals(){
        this._animalCollection.forEach(animal=>{
            new AnimalComponent(
                document.getElementById("animal")! as HTMLTemplateElement,
                this.element.querySelector(".animals-grid")!,
                false,
                animal
            )
        })
    }
}