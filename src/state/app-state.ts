import { Animal } from "../models/animal";

export class RescueCenterState{
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