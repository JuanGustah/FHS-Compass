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
        
        this._animals.push(new Animal("BOB","bob.png"));
        this._animals.push(new Animal("CLORINDE","clorinde.png"));
        this._animals.push(new Animal("RONEY","roney.png"));
        this._animals.push(new Animal("FLOCKS","flocks.png"));
        this._animals.push(new Animal("MARY","mary.png"));
        this._animals.push(new Animal("ROBS","robs.png"));
        this._animals.push(new Animal("MATT","matt.png"));
        this._animals.push(new Animal("ARISTOTLE","aristotle.png"));
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
        this.inject(this.injectAtStart);
    }

    private inject(injectAtStart:boolean){
        this.injectableElement.insertAdjacentElement(
            injectAtStart?'afterbegin':'beforeend'
            ,this.element
        );
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

class Animal{
    private _name:String;
    private _imgAssetsSrc:String;

    public constructor(name:String,imgSrc:String){
        this._name = name;
        this._imgAssetsSrc = imgSrc;

    }

    public get name(){
        return this._name;
    }

    public get imgAssetsSrc(){
        return this._imgAssetsSrc;
    }

}

const state = RescueCenterState.getInstance();

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