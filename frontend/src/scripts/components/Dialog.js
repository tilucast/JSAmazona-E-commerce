import { initiateMaterialDialog } from "../utils/materialIoScripts"

export default {
    instantiateMaterialDialog(){
        return initiateMaterialDialog()
    },

    insertMaterialDialogIntoDOM(DOMElement, dialogMsgContent, nOfButtons, firstMsg, secondMsg){
        return DOMElement.innerHTML = `
        <div class="mdc-dialog">
            <div class="mdc-dialog__container">
                <div 
                    class="mdc-dialog__surface"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content"
                >
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        <span>${dialogMsgContent}</span>
                    </div>
                    <div class="mdc-dialog__actions">
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="${firstMsg}">
                            <div class="mdc-button__ripple"></div>
                            <span class="mdc-button__label">${firstMsg}</span>
                        </button>
                        ${nOfButtons != 1 ? ` 
                            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="${secondMsg}">
                                <div class="mdc-button__ripple"></div>
                                <span class="mdc-button__label">${secondMsg}</span>
                            </button>
                        ` : ""
                        }
                    </div>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </div>
        `
    }
}