import {MDCRipple} from '@material/ripple'
import {MDCSelect} from '@material/select';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldHelperText} from '@material/textfield/helper-text';
import {MDCSnackbar} from '@material/snackbar';
import { MDCLinearProgress } from '@material/linear-progress';
import {MDCTextFieldIcon} from '@material/textfield/icon';
import {MDCDialog} from '@material/dialog';
import {MDCTabBar} from '@material/tab-bar';
import {MDCFormField} from '@material/form-field';
import {MDCRadio} from '@material/radio';

export function initiateMaterialButton(){
    const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'))
}

export function initiateMaterialMultipleButtons(){
    const buttons = [].map.call(document.querySelectorAll('.mdc-button'), function(el){
        return new MDCRipple(el)
    })
}

export function initiateMaterialSelect(){
    const selects = [].map.call(document.querySelectorAll('.mdc-select'), function(el){
        return new MDCSelect(el)
    })

    return selects
}

export function initiateMaterialTextField(){
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el){
        return new MDCTextField(el)
    })
}

export function initiateMaterialTextHelper(){
    const textHelpers = [].map.call(document.querySelectorAll('.mdc-text-field-helper-text'), function(el){
        return new MDCTextFieldHelperText(el)
    })
}

export function initiateMaterialSnackbar(){
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    
    return snackbar
}

export function initiateMaterialProgressIndicator(){
    const linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));

    return linearProgress
}

export function initiateMaterialTextfieldIcon(){
    const icons = [].map.call(document.querySelectorAll(".mdc-text-field__icon"), function(el){
        return new MDCTextFieldIcon(el)
    })

    return icons
}

export function initiateMaterialDialog(){
    const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

    return dialog
}

export function initiateMaterialTabs(){
    const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

    return tabBar
}

export function initiateMaterialRadioButtons(){
    const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
    
    const radioButtons = [].map.call(document.querySelectorAll(".mdc-radio"), function(el){
        return new MDCRadio(el)
    })

    return [formField, radioButtons]
}