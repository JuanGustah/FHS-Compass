import { Component } from "./base-component";
import { validator } from "../util/validation";
import { Router } from "../router/router";

export class NewsletterComponent extends Component{
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
            this.router.route("success");
        }else{
            errorMessage.style.display = "block";
        }

    }
}