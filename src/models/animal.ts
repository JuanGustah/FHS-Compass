export class Animal{
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