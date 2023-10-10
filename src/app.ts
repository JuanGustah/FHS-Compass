import { RescueCenterState } from "./state/app-state";
import { Router } from "./router/router";
import { AdoptModal } from "./models/adopt-modal";
import { DonateModal } from "./models/donate-modal";

const state = RescueCenterState.getInstance();
const router = new Router(state);

const adoptModal = new AdoptModal(
    document.getElementById("adopt-modal")! as HTMLDialogElement,
    router
);
new DonateModal(
    document.getElementById("donate-modal")! as HTMLDialogElement,
    router,
    state
);

//adicionando event listener para o botão do navbar
document.querySelector("header.navbar .donate-button")!.addEventListener("click",()=>{
    adoptModal.openModal()
})