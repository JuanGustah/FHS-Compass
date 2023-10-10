import { Router } from "../router/router";
import { RescueCenterState } from "../state/app-state";

export class Modal{
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