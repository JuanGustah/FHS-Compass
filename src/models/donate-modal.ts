import { Modal } from "./base-modal";
import { RescueCenterState } from "../state/app-state";
import { Router } from "../router/router";

export class DonateModal extends Modal{
    moneyInputElement:HTMLInputElement;
    buttonHelpElement:HTMLButtonElement;
    buttonCancelElement:HTMLButtonElement;

    constructor(modalElement:HTMLDialogElement,router:Router,state:RescueCenterState){
        super(modalElement,router,state);

        this.moneyInputElement = document.getElementById("money-donate")! as HTMLInputElement;
        this.buttonHelpElement = this.modalElement.querySelector(".help-button")! as HTMLButtonElement ;
        this.buttonCancelElement = this.modalElement.querySelector(".back-button")! as HTMLButtonElement ;
        
        this.buttonHelpElement.addEventListener("click",this.handleDonate.bind(this));
        this.buttonCancelElement.addEventListener("click",()=>{this.closeModal()});
    }

    private handleDonate(){
        //validação

        const donationValue = Number(this.moneyInputElement.value);
        if(donationValue){
            this.state!.increaseFounds(donationValue);
        }

        this.closeModal();
        this.router.route("success");
    }
}