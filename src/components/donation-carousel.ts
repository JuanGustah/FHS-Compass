import { CarouselComponent } from "./carousel";
import { CardComponent } from "./card";
import { Card } from "../models/card";

export class DonationsCarousel extends CarouselComponent{
    cardList:Card[]=[];

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean
    ){
        super(templateElement,injectableElement,injectAtStart,6);
        this.element.classList.add("donation");

        this.cardList.push({title:"Shelter",src:"house.svg",description:"We provide shelter for many of our cats and dogs. In addition to a roof over their heads, we pay for heat, food, water, and electricity, and general maintenance."})
        this.cardList.push({title:"Vetting",src:"cross.svg",description:"We provide vet care to our cats and dogs. We take care of general health assessments medications, vaccinations, spay/neuter procedures, and other surgeries."})
        this.cardList.push({title:"Facilities",src:"building.svg",description:"We currently utilize a facility in a dilapidated state, which has necessitated significant investments to make it usable again. We are still restoring the building to its full potential."})
        this.cardList.push({title:"Transport",src:"paste.svg",description:"Each year, we transport over 600 dogs and 350 cats from kill shelters and emergency distressing situations to hospitals or our shelter, providing them with a second chance at life."})
        this.cardList.push({title:"Fosters",src:"smile_face.svg",description:"We’re lucky to have a group of individuals who generously foster our cats and dogs in their homes. We cover all their veterinary needs and provide necessary food supplies."})
        this.cardList.push({title:"Food",src:"bone.svg",description:"Each year, we nourish our  cats and dogs with over 2,200 cans of wet food and 1,600 pounds of dry food to ensure their well-being and keep them content and thriving."})
    
        this.drawContent();
    }

    drawContent(){
        this.cardList.forEach(data=>{
            new CardComponent(
                document.getElementById("card")! as HTMLTemplateElement,
                this.carouselElement as HTMLElement,
                false,
                data.title,
                data.description,
                data.src
            )
        })
    }
}