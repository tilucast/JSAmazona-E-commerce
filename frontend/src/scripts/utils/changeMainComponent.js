export default function changeMainComponentGridLayout(gridLayout = "center-start / center-end"){
    const mainContent = document.querySelector("#mainContent")
    mainContent.style.gridColumn = gridLayout
}