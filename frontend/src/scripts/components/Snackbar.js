import { initiateMaterialSnackbar } from "../utils/materialIoScripts"

export default {
    instantiateMaterialSnackbar(){
        return initiateMaterialSnackbar()
    },

    insertMaterialSnackbarIntoDOM(DOMElement){
        return DOMElement.innerHTML = `
        <div class="mdc-snackbar">
            <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
                <div class="mdc-snackbar__label" aria-atomic="false">
                    
                </div>
                <div class="mdc-snackbar__actions" aria-atomic="true">
                <button type="button" class="mdc-button mdc-snackbar__action">
                    <div class="mdc-button__ripple"></div>
                    <span class="mdc-button__label">
                        <span class="material-icons">
                            close
                        </span>
                    </span>
                </button>
                </div>
            </div>
        </div>
        
        `
    }
}