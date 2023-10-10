import { CarouselComponent } from "./carousel";

export class ImageCarousel extends CarouselComponent{
    imagesAssetsSrc:String[]=[];

    public constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean){
        super(templateElement,injectableElement,injectAtStart,5);
        this.imagesAssetsSrc.push("bob.png");
        this.imagesAssetsSrc.push("clorinde.png");
        this.imagesAssetsSrc.push("roney.png");
        this.imagesAssetsSrc.push("flocks.png");
        this.imagesAssetsSrc.push("aristotle.png");
        this.imagesAssetsSrc.push("bob.png");
        this.imagesAssetsSrc.push("clorinde.png");
        this.imagesAssetsSrc.push("roney.png");
        this.drawContent();
    }

    drawContent(){
        this.imagesAssetsSrc.forEach(src => {
            let img = document.createElement("img");
            img.src=`./assets/${src}`;
            this.carouselElement.appendChild(img);
        });
    }
}