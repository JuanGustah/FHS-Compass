import { Router } from "../router/router";
import { Modal } from "./base-modal";

export class AdoptModal extends Modal{
    dayDateBirhtElement:HTMLSelectElement;
    monthDateBirhtElement:HTMLSelectElement;
    yearDateBirhtElement:HTMLSelectElement;
    buttonAdoptElement:HTMLButtonElement;
    buttonCancelElement:HTMLButtonElement;

    constructor(modalElement:HTMLDialogElement,router:Router){
        super(modalElement,router);

        this.modalElement = document.getElementById("adopt-modal")! as HTMLDialogElement;
        this.dayDateBirhtElement = document.getElementById("day-adopt")! as HTMLSelectElement;
        this.monthDateBirhtElement = document.getElementById("month-adopt")! as HTMLSelectElement;
        this.yearDateBirhtElement = document.getElementById("year-adopt")! as HTMLSelectElement;
        this.buttonAdoptElement = this.modalElement.querySelector(".adopt-alt-button")! as HTMLButtonElement ;
        this.buttonCancelElement = this.modalElement.querySelector(".back-alt-button")! as HTMLButtonElement ;
        
        for (let day = 1; day <= 31; day++) {
            let opt = document.createElement("option");
            opt.value = day.toString();
            opt.innerHTML = day.toString();

            this.dayDateBirhtElement.append(opt);
        }

        for (let month = 1; month <= 12; month++) {
            let opt = document.createElement("option");
            opt.value = month.toString();
            opt.innerHTML = month.toString();

            this.monthDateBirhtElement.append(opt);
        }

        for (let year = 2023; year >= 1970; year--) {
            let opt = document.createElement("option");
            opt.value = year.toString();
            opt.innerHTML = year.toString();

            this.yearDateBirhtElement.append(opt);
        }

        this.buttonAdoptElement.addEventListener("click",this.handleAdopt.bind(this));
        this.buttonCancelElement.addEventListener("click",()=>{this.closeModal()});
    }

    private handleAdopt(){
        //validação

        this.closeModal();
        this.router.route("success");
    }
}