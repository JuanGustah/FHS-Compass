import { Component } from "./base-component";
import { CardComponent } from "./card";
import { Card } from "../models/card";
import { Router } from "../router/router";

export class DifferenceComponent extends Component{
    cardList:Card[]=[];

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        router:Router
    ){
        super(templateElement,injectableElement,injectAtStart);
        this.drawCardsRow();

        this.cardList.push({title:"Adopt or Foster",button:{backgroundColor:"#04C27F",textColorIsDark:true,label:"View Adoptables",clickFunction:()=>{router.route("pets")}},description:"Provide a forever or temporary home to a homeless animal."})
        this.cardList.push({title:"Volunteer",button:{backgroundColor:"#F1D06E",textColorIsDark:true,label:"Get Involved"},description:"We are always in need of passionate and friendly volunteers."})
        this.cardList.push({title:"Donate Monthly",button:{backgroundColor:"#FF3D9A",textColorIsDark:false,label:"Give Monthly"},description:"Regular donations is a reliable stream of funds to help sustain."})
        this.cardList.push({title:"Start a Fundraiser",button:{backgroundColor:"#5758F1",textColorIsDark:false,label:"Learn More"},description:"Start a fundraiser to raise funds and help us continue our mission."})
    
        this.drawCardsRow();
    }

    private drawCardsRow(){
        this.cardList.forEach(data=>{
            new CardComponent(
                document.getElementById("card")! as HTMLTemplateElement,
                this.element.querySelector(".cards-row") as HTMLElement,
                false,
                data.title,
                data.description,
                undefined,
                data.button
            )
        })
    }
}