interface Card{
    title:string;
    description:string;
    src?:string;
    button?:CardButton
}
type CardButton = {
    label:string;
    backgroundColor:string;
    textColorIsDark:boolean;
    link:string
}
type Pages = "home"|"pets"|"success";

class RescueCenterState{
    private _animalsRescued:number;
    private _animalsAdopted:number;
    private _founds:number;
    private _animals:Animal[];

    private static instance:RescueCenterState;

    private constructor(){
        this._animalsRescued = 1400;
        this._animalsAdopted = 940;
        this._founds = 1400000;
        this._animals=[];
        
        this._animals.push(new Animal("BOB","bob.png","orange cat"));
        this._animals.push(new Animal("CLORINDE","clorinde.png","white cat"));
        this._animals.push(new Animal("RONEY","roney.png","brown dog"));
        this._animals.push(new Animal("FLOCKS","flocks.png","white dog"));
        this._animals.push(new Animal("MARY","mary.png","gray cat"));
        this._animals.push(new Animal("ROBS","robs.png","a pug"));
        this._animals.push(new Animal("MATT","matt.png","gray cat"));
        this._animals.push(new Animal("ARISTOTLE","aristotle.png","brown dog"));
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new RescueCenterState();
        }
        return this.instance;
    }
    
    public get animalsRescued(){
        return this._animalsRescued;
    }

    public get animalsAdopted(){
        return this._animalsAdopted;
    }

    public get founds(){
        return this._founds;
    }

    public get animals(){
        return this._animals;
    }

    public increaseFounds(increaseFounds:number){
        this._founds += increaseFounds;
    }
}
class Animal{
    private _name:string;
    private _imgAssetsSrc:string;
    private _altImgText:string;

    public constructor(name:string,imgSrc:string,_altImgText:string){
        this._name = name;
        this._imgAssetsSrc = imgSrc;
        this._altImgText = _altImgText;
    }

    public get name(){
        return this._name;
    }

    public get imgAssetsSrc(){
        return this._imgAssetsSrc;
    }

    public get altImgText(){
        return this._altImgText;
    }

}

abstract class Component{
    private templateElement: HTMLTemplateElement;
    private injectableElement: HTMLElement;
    protected element: Element;
    private injectAtStart:boolean;

    constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean){
        this.templateElement = templateElement;
        this.injectableElement = injectableElement;
        this.injectAtStart = injectAtStart;

        const templateNode = document.importNode(this.templateElement.content,true);
        this.element = templateNode.firstElementChild!;
        this.inject();
    }

    private inject(){
        this.injectableElement.insertAdjacentElement(
            this.injectAtStart?'afterbegin':'beforeend'
            ,this.element
        );
    }

    public destroy(){
        this.element.remove();
    }
}

class HomeComponent extends Component{}
class StatsComponent extends Component{}
class StatComponent extends Component{
    constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean,mainText:string, description:string){
        super(templateElement,injectableElement,injectAtStart);
        this.renderStat(mainText,description);
    }

    renderStat(mainText:string, description:string){
        this.element.firstElementChild!.textContent = mainText;
        this.element.lastElementChild!.textContent = description;
    }
}

abstract class CarouselComponent extends Component{
    carouselElement:Element;
    dotsElement:Element[];
    carouselPosition=0;

    public constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean){
        super(templateElement,injectableElement,injectAtStart);
        this.carouselElement = this.element.querySelector(".carousel")!;
        this.dotsElement = Array.from(this.element.querySelector(".dots")!.querySelectorAll(".dot"));
        this.addListeners();
    }

    public changePosition(position: "left"|"right"){
        this.resetDots(this.dotsElement);

        switch (position) {
            case "left":
                if(this.carouselPosition===0){
                    this.carouselElement.scrollLeft = 278*4;
                    this.carouselPosition = 3;
                    break;
                }
                this.carouselElement.scrollLeft -= 278;
                this.carouselPosition--;
            break;
            case "right":
                if(this.carouselPosition<3){
                    this.carouselElement.scrollLeft += 278;
                    this.carouselPosition++;
                    break;
                }
                this.carouselElement.scrollLeft = 0;
                this.carouselPosition=0;
            break;
        }
        this.dotsElement[this.carouselPosition].classList.add("active");
    }

    private addListeners(){
        this.element.querySelector("#left-button")!.addEventListener("click",()=>{this.changePosition("left")});
        this.element.querySelector("#right-button")!.addEventListener("click",()=>{this.changePosition("right")});
    }

    private resetDots(dotsList:Element[]){
        dotsList.forEach(dot => {
            dot.classList.remove("active")
        });
    }
    abstract drawContent():void;
}
class ImageCarousel extends CarouselComponent{
    imagesAssetsSrc:String[]=[];

    public constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean){
        super(templateElement,injectableElement,injectAtStart);
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
class DonationsCarousel extends CarouselComponent{
    cardList:Card[]=[];

    public constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean){
        super(templateElement,injectableElement,injectAtStart);
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

class DonationsComponent extends Component{}
class CardComponent extends Component{
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
            // button. this.cardButton.link;
            this.element.appendChild(button);
        }
    }
}
class AdoptionInfoComponent extends Component{}
class DifferenceComponent extends Component{
    cardList:Card[]=[];

    public constructor(templateElement:HTMLTemplateElement,injectableElement:HTMLElement,injectAtStart:boolean){
        super(templateElement,injectableElement,injectAtStart);
        this.drawCardsRow();

        this.cardList.push({title:"Adopt or Foster",button:{backgroundColor:"#04C27F",textColorIsDark:true,label:"View Adoptables",link:""},description:"Provide a forever or temporary home to a homeless animal."})
        this.cardList.push({title:"Volunteer",button:{backgroundColor:"#F1D06E",textColorIsDark:true,label:"Get Involved",link:""},description:"We are always in need of passionate and friendly volunteers."})
        this.cardList.push({title:"Donate Monthly",button:{backgroundColor:"#FF3D9A",textColorIsDark:false,label:"Give Monthly",link:""},description:"Regular donations is a reliable stream of funds to help sustain."})
        this.cardList.push({title:"Start a Fundraiser",button:{backgroundColor:"#5758F1",textColorIsDark:false,label:"Learn More",link:""},description:"Start a fundraiser to raise funds and help us continue our mission."})
    
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
class AdoptComponent extends Component{
}
class NewsletterComponent extends Component{}
class PetsComponent extends Component{
    private _animalCollection: Animal[];

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean, 
        animalCollection: Animal[],
        backFunction:Function
    ){
        super(templateElement,injectableElement,injectAtStart); 
        this._animalCollection = animalCollection;

        this.drawAnimals();
        this.element.querySelector("button")!.addEventListener("click",()=>{
            backFunction()
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
class AnimalComponent extends Component{
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
class SuccessComponent extends Component{
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
class DonateModal{
    emailInputElement:HTMLInputElement;
    moneyInputElement:HTMLInputElement;
    paymentInputElement:HTMLInputElement;
    buttonHelpElement:HTMLButtonElement;
    buttonCancelElement:HTMLButtonElement;

    constructor(
        emailInputElement:HTMLInputElement,
        moneyInputElement:HTMLInputElement,
        paymentInputElement:HTMLInputElement,
        buttonHelpElement:HTMLButtonElement,
        buttonCancelElement:HTMLButtonElement
    ){
        this.emailInputElement = emailInputElement;
        this.moneyInputElement = moneyInputElement;
        this.paymentInputElement = paymentInputElement;
        this.buttonHelpElement = buttonHelpElement;
        this.buttonCancelElement = buttonCancelElement;

        this.buttonCancelElement.addEventListener("click",this.handleDonate);
    }

    private handleDonate(){
        console.log("teste")
    }
}

class Router{
    private _page:Pages;


    constructor(){
        this._page = "home";
        this.route(this._page);
    }

    public get page(){
        return this._page;
    }

    public route(page:Pages){
        this.clearElements();

        switch(page){
            case "home":
                this.routeToHome();
                break;
            case "pets":
                this.routeToPets();
                break;
            case "success":
                this.routeToSuccess();
                break;
        }
    }

    private clearElements(){
        let children = Array.from(document.getElementById('app')!.children);

        children.forEach(child=>{
            child.remove();
        })
    }

    private routeToHome(){
        new HomeComponent(
            document.getElementById('home')! as HTMLTemplateElement,
            document.getElementById('app')!,
            true
        );

        new StatsComponent(
            document.getElementById('stats')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false
        );

        new StatComponent(
            document.getElementById('stat')! as HTMLTemplateElement,
            document.getElementById('stats-line')!,
            true,
            state.animalsRescued.toString(),
            "Animals Rescued"
        )

        new StatComponent(
            document.getElementById('stat')! as HTMLTemplateElement,
            document.getElementById('stats-line')!,
            false,
            new Intl.NumberFormat("en-EN",{
                style:"currency",
                currency:"USD",
                notation:"compact",
            }).format(state.founds).replace('M', ' Milion'),
            "Raised"
        )

        new StatComponent(
            document.getElementById('stat')! as HTMLTemplateElement,
            document.getElementById('stats-line')!,
            false,
            state.animalsAdopted.toString(),
            "Tails Found a Home"
        )

        new ImageCarousel(
            document.getElementById('carousel')! as HTMLTemplateElement,
            document.querySelector(".stats")!,
            false,
        )

        new DonationsComponent(
            document.getElementById('donations')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false
        )

        new DonationsCarousel(
            document.getElementById('carousel')! as HTMLTemplateElement,
            document.querySelector(".donations")!,
            false
        )

        new AdoptionInfoComponent(
            document.getElementById('adopt_info')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false   
        )

        new DifferenceComponent(
            document.getElementById('difference')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false   
        )

        new AdoptComponent(
            document.getElementById('adopt')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false 
        )

        new NewsletterComponent(
            document.getElementById('newsletter')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false 
        )   
    }

    private routeToPets(){
        new PetsComponent(
            document.getElementById("pets")! as HTMLTemplateElement,
            document.getElementById('app')!,
            true,
            state.animals,
            ()=>{this.route("home")}
        )
    }

    private routeToSuccess(){
        new SuccessComponent(
            document.getElementById("success")! as HTMLTemplateElement,
            document.getElementById('app')!,
            true,
            this
        )
    }
}

const state = RescueCenterState.getInstance();
const router = new Router();
router.route("success");

