import iziToast, { IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.css"
import { errorExtractor } from "error-extractor";

class Notify {
    private settings: IziToastSettings = {
        position: "topRight",
        transitionIn: "fadeInRight",
        transitionOut: "fadeOutRight",
        timeout: 2500
    }
    public success(message:string){
        this.settings.message = message;
        iziToast.success(this.settings);
    }

    public error(err:any){
        this.settings.message = errorExtractor.getMessage(err);
        iziToast.error(this.settings);
    }

}

export const notify = new Notify();
