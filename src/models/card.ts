export interface Card{
    title:string;
    description:string;
    src?:string;
    button?:CardButton
}

export type CardButton = {
    label:string;
    backgroundColor:string;
    textColorIsDark:boolean;
    clickFunction?:clickFunction
}

type clickFunction = ()=>void;
