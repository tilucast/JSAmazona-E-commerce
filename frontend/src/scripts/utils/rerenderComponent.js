export default async function rerenderComponent(component, DOMElement){
    const Component = new component()

    document.querySelector(DOMElement).innerHTML = await Component.render()
    await Component.afterRender()
}