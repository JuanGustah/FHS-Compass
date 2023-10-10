import { Component } from "./base-component";

export abstract class CarouselComponent extends Component{
    carouselElement:Element;
    dotsElement:Element[] = [];
    dotsQtd:number;
    carouselPosition=0;

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        dotsQtd:number
    ){
        super(templateElement,injectableElement,injectAtStart);
        this.carouselElement = this.element.querySelector(".carousel")!;
        this.dotsQtd = dotsQtd;
        this.configure();
    }

    public changePosition(position: "left"|"right"){
        this.resetDots(this.dotsElement);
        let gap = Number(window.getComputedStyle(this.carouselElement,null).getPropertyValue("column-gap").replace("px",""));
        let sizeOfChild = this.carouselElement.firstElementChild!.getBoundingClientRect().width
        let size= sizeOfChild + gap;
        
        switch (position) {
            case "left":
                if(this.carouselPosition===0){
                    this.carouselElement.scrollLeft = size*(this.dotsQtd-1);
                    this.carouselPosition = (this.dotsQtd-1);
                    break;
                }
                this.carouselElement.scrollLeft -= size;
                this.carouselPosition--;
            break;
            case "right":
                if(this.carouselPosition<(this.dotsQtd-1)){
                    this.carouselElement.scrollLeft += size;
                    this.carouselPosition++;
                    break;
                }
                this.carouselElement.scrollLeft = 0;
                this.carouselPosition=0;
            break;
        }
        
        this.dotsElement[this.carouselPosition].classList.add("active");
    }

    private configure(){
        let dotsDiv = this.element.querySelector(".dots")!;
        
        for (let index = 0; index < this.dotsQtd; index++) {
            let dot = document.createElement("div");
            dot.classList.add("dot");

            this.dotsElement.push(dot);
            dotsDiv.appendChild(dot);
        }
        this.dotsElement[0].classList.add("active");

        this.element.querySelector(".control-button.left")!.addEventListener("click",()=>{this.changePosition("left")});
        this.element.querySelector(".control-button.right")!.addEventListener("click",()=>{this.changePosition("right")});
    }

    private resetDots(dotsList:Element[]){
        dotsList.forEach(dot => {
            dot.classList.remove("active")
        });
    }
    abstract drawContent():void;
}