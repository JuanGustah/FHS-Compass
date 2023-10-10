export abstract class Component{
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