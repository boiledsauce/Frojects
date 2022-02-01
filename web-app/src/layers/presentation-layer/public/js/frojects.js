document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector("#sidebar")

    const button = document.querySelector("#collapse-sidebar-btn")

    button.addEventListener("click", function() {
        console.log(sidebar.offsetWidth)
        sidebar.style.width = sidebar.offsetWidth === "0" ? "280px" : "0px"
    })
})