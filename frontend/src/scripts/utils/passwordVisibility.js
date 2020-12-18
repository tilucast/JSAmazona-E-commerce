export default function passwordVisibility(materialIconObject){
    const i = document.querySelector('#visibility')
    
    i.addEventListener("click", () => {
        
        const passwordInput = document.querySelector('#password')

        materialIconObject.forEach(icon => {
            if(icon.foundation.adapter.getAttr('id') === 'visibility'){
                icon.foundation.adapter.setContent('visibility_off')
                icon.foundation.adapter.setAttr("id", "visibility_off")
                passwordInput.setAttribute("type", "text")
            } else {
                icon.foundation.adapter.setContent('visibility')
                icon.foundation.adapter.setAttr("id", "visibility")
                passwordInput.setAttribute("type", "password")
            }
        })
    })
}