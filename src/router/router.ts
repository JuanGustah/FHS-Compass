import { AdoptComponent } from "../components/adopt";
import { AdoptionInfoComponent } from "../components/adoption-info";
import { DifferenceComponent } from "../components/difference";
import { DonationsCarousel } from "../components/donation-carousel";
import { DonationsComponent } from "../components/donations";
import { HomeComponent } from "../components/home";
import { ImageCarousel } from "../components/image-carousel";
import { NewsletterComponent } from "../components/newsletter";
import { PetsComponent } from "../components/pets";
import { StatComponent } from "../components/stat";
import { StatsComponent } from "../components/stats";
import { SuccessComponent } from "../components/success";
import { RescueCenterState } from "../state/app-state";

type Pages = "home"|"pets"|"success";

export class Router{
    private _page:Pages;
    private state:RescueCenterState;

    constructor(state:RescueCenterState){
        this.state = state;
        this._page = "home";
        this.route(this._page);
    }

    public get page(){
        return this._page;
    }

    public route(page:Pages){
        this.clearElements();

        switch(page){
            case "home":
                this.routeToHome();
                break;
            case "pets":
                this.routeToPets();
                break;
            case "success":
                this.routeToSuccess();
                break;
        }
    }

    private clearElements(){
        let children = Array.from(document.getElementById('app')!.children);

        children.forEach(child=>{
            child.remove();
        })
    }

    private routeToHome(){
        new HomeComponent(
            document.getElementById('home')! as HTMLTemplateElement,
            document.getElementById('app')!,
            true,
            document.getElementById("donate-modal")! as HTMLDialogElement,
            document.getElementById("adopt-modal")! as HTMLDialogElement
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
            this.state.animalsRescued.toString(),
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
            }).format(this.state.founds).replace('M', ' Milion'),
            "Raised"
        )

        new StatComponent(
            document.getElementById('stat')! as HTMLTemplateElement,
            document.getElementById('stats-line')!,
            false,
            this.state.animalsAdopted.toString(),
            "Tails Found a Home"
        )

        new ImageCarousel(
            document.getElementById('carousel')! as HTMLTemplateElement,
            document.querySelector(".stats")!,
            false,
        )

        new DonationsComponent(
            document.getElementById('donations')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false
        )

        new DonationsCarousel(
            document.getElementById('carousel')! as HTMLTemplateElement,
            document.querySelector(".donations")!,
            false
        )

        new AdoptionInfoComponent(
            document.getElementById('adopt-info')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            document.getElementById("adopt-modal")! as HTMLDialogElement
        )

        new DifferenceComponent(
            document.getElementById('difference')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            this
        )

        new AdoptComponent(
            document.getElementById('adopt')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            this,
            document.getElementById("adopt-modal")! as HTMLDialogElement
        )

        new NewsletterComponent(
            document.getElementById('newsletter')! as HTMLTemplateElement,
            document.getElementById('app')!,
            false,
            this
        )   
    }

    private routeToPets(){
        new PetsComponent(
            document.getElementById("pets")! as HTMLTemplateElement,
            document.getElementById('app')!,
            true,
            this.state.animals,
            this
        )
    }

    private routeToSuccess(){
        new SuccessComponent(
            document.getElementById("success")! as HTMLTemplateElement,
            document.getElementById('app')!,
            true,
            this
        )
    }
}