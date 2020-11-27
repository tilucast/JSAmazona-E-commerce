export default async function rerenderComponent(component, DOMElement){
    document.querySelector(DOMElement).innerHTML = await component.render()
    await component.afterRender()
}