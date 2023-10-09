interface Card{
    title:string;
    description:string;
    src?:string;
    button?:CardButton
}
interface Validable{
    value: string | number;
    isRequired?: boolean;
    isEmail?: boolean;
}

type CardButton = {
    label:string;
    backgroundColor:string;
    textColorIsDark:boolean;
    clickFunction?:clickFunction
}
type Pages = "home"|"pets"|"success";
type clickFunction = ()=>void;

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

class HomeComponent extends Component{
    donateButtonElement:HTMLButtonElement;
    adoptButtonElement:HTMLButtonElement;

    constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        modalDonate:HTMLDialogElement,
        modalAdopt:HTMLDialogElement,
    ){
        super(templateElement,injectableElement,injectAtStart);

        this.donateButtonElement = this.element.querySelector(".donate-button")! as HTMLButtonElement;
        this.adoptButtonElement = this.element.querySelector(".adopt-button")! as HTMLButtonElement;

        this.donateButtonElement.addEventListener("click",()=>{modalDonate.showModal()})
        this.adoptButtonElement.addEventListener("click",()=>{modalAdopt.showModal()})
    }
}
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

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        router:Router
    ){
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
            
            if(this.cardButton.clickFunction){
                button.addEventListener("click",this.cardButton.clickFunction);
            }

            this.element.appendChild(button);
        }
    }
}
class AdoptionInfoComponent extends Component{
    adoptButtonElement:HTMLButtonElement;

    constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        modalAdopt:HTMLDialogElement,
    ){
        super(templateElement,injectableElement,injectAtStart);
        this.adoptButtonElement = this.element.querySelector(".adopt-alternative-button")! as HTMLButtonElement;
        this.adoptButtonElement.addEventListener("click",()=>{modalAdopt.showModal()})
    }
}
class DifferenceComponent extends Component{
    cardList:Card[]=[];

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean
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
class AdoptComponent extends Component{
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
class NewsletterComponent extends Component{
    formElement:HTMLFormElement;
    emailInputElement:HTMLInputElement;
    subscribeButtonElement:HTMLButtonElement;
    router:Router;

    public constructor(
        templateElement:HTMLTemplateElement,
        injectableElement:HTMLElement,
        injectAtStart:boolean,
        router:Router
    ){
        super(templateElement,injectableElement,injectAtStart);

        this.router = router;
        this.formElement = this.element.querySelector('form')! as HTMLFormElement;
        this.emailInputElement = this.formElement.elements[0] as HTMLInputElement;
        this.subscribeButtonElement = this.formElement.elements[1] as HTMLButtonElement;

        this.formElement.addEventListener("submit",this.handleSubmit.bind(this));
    }

    private handleSubmit(event:Event){
        event.preventDefault();
        let errorMessage = this.element.querySelector(".error-message") as HTMLDivElement;
        errorMessage.style.display = "none";

        let validateEmail = {
            value:this.emailInputElement.value,
            isRequired:true,
            isEmail:true
        }

        if(validator(validateEmail)){
            router.route("success");
        }else{
            errorMessage.style.display = "block";
        }

    }
}
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

class Modal{
    modalElement:HTMLDialogElement;
    formElements:HTMLFormControlsCollection;
    router:Router;
    state?:RescueCenterState;

    constructor(modalElement:HTMLDialogElement,router:Router,state?:RescueCenterState){
        this.modalElement = modalElement;
        this.formElements = this.modalElement.querySelector("form")!.elements;
        this.router = router;
        this.state = state;
    }

    public openModal(){
        this.modalElement.showModal();
    }

    public closeModal(){
        this.modalElement.close();
    }
}

class DonateModal extends Modal{
    emailInputElement:HTMLInputElement;
    moneyInputElement:HTMLInputElement;
    paymentInputElement:NodeListOf<HTMLInputElement>;
    buttonHelpElement:HTMLButtonElement;
    buttonCancelElement:HTMLButtonElement;

    constructor(modalElement:HTMLDialogElement,router:Router,state:RescueCenterState){
        super(modalElement,router,state);

        this.modalElement = document.getElementById("donate-modal")! as HTMLDialogElement;
        this.emailInputElement = document.getElementById("email_donate")! as HTMLInputElement;
        this.moneyInputElement = document.getElementById("money_donate")! as HTMLInputElement;
        this.paymentInputElement = this.modalElement.querySelectorAll("input[name='payment']");
        this.buttonHelpElement = this.modalElement.querySelector(".help-button")! as HTMLButtonElement ;
        this.buttonCancelElement = this.modalElement.querySelector(".back-button")! as HTMLButtonElement ;
        
        this.buttonHelpElement.addEventListener("click",this.handleDonate.bind(this));
        this.buttonCancelElement.addEventListener("click",()=>{this.closeModal()});
    }

    private handleDonate(){
        //validação
        const donationValue = Number(this.moneyInputElement.value);
        if(donationValue){
            state.increaseFounds(donationValue);
        }

        this.closeModal();
        this.router.route("success");
    }
}
class AdoptModal extends Modal{
    emailInputElement:HTMLInputElement;
    nameInputElement:HTMLInputElement;
    dayDateBirhtElement:HTMLSelectElement;
    monthDateBirhtElement:HTMLSelectElement;
    yearDateBirhtElement:HTMLSelectElement;
    buttonAdoptElement:HTMLButtonElement;
    buttonCancelElement:HTMLButtonElement;

    constructor(modalElement:HTMLDialogElement,router:Router){
        super(modalElement,router,state);

        this.modalElement = document.getElementById("adopt-modal")! as HTMLDialogElement;
        this.emailInputElement = document.getElementById("email-adopt")! as HTMLInputElement;
        this.nameInputElement = document.getElementById("name-adopt")! as HTMLInputElement;
        this.dayDateBirhtElement = document.getElementById("day-adopt")! as HTMLSelectElement;
        this.monthDateBirhtElement = document.getElementById("month-adopt")! as HTMLSelectElement;
        this.yearDateBirhtElement = document.getElementById("year-adopt")! as HTMLSelectElement;
        this.buttonAdoptElement = this.modalElement.querySelector(".adopt-alt-button")! as HTMLButtonElement ;
        this.buttonCancelElement = this.modalElement.querySelector(".back-alt-button")! as HTMLButtonElement ;
        
        this.buttonAdoptElement.addEventListener("click",this.handleAdopt.bind(this));
        this.buttonCancelElement.addEventListener("click",()=>{this.closeModal()});
    }

    private handleAdopt(){
        //validação
        console.log("teste");
        

        this.closeModal();
        this.router.route("success");
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
            true,
            document.getElementById("donate-modal")! as HTMLDialogElement,
            document.getElementById("adopt-modal")! as HTMLDialogElement
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
            false,
            this
        )

        new AdoptionInfoComponent(
            document.getElementById('adopt_info')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            document.getElementById("adopt-modal")! as HTMLDialogElement
        )

        new DifferenceComponent(
            document.getElementById('difference')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false   
        )

        new AdoptComponent(
            document.getElementById('adopt')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            this,
            document.getElementById("adopt-modal")! as HTMLDialogElement
        )

        new NewsletterComponent(
            document.getElementById('newsletter')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            this
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

function validator(validableObject:Validable){
    const value = validableObject.value;
    let isValid = true;    

    if(validableObject.isRequired){
        isValid = isValid && value.toString().length !==0;
    }

    if(validableObject.isEmail){
        //regex para validação de e-mail explicado em https://www.abstractapi.com/guides/email-validation-regex-javascript
        isValid = isValid && value.toString().match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/) !== null;
    }

    return isValid;
}

const state = RescueCenterState.getInstance();
const router = new Router();

const adoptModal = new AdoptModal(
    document.getElementById("adopt-modal")! as HTMLDialogElement,
    router
);
new DonateModal(
    document.getElementById("donate-modal")! as HTMLDialogElement,
    router,
    state,
);


//adicionando event listener para o botão do navbar
document.querySelector("header.navbar .donate-button")!.addEventListener("click",()=>{
    adoptModal.openModal()
})