document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector("#sidebar")

    const button = document.querySelector("#collapse-sidebar-btn")

    button.addEventListener("click", function() {
        if (sidebar.offsetWidth == 280){
            sidebar.style.width = "0px"
        } else {
            sidebar.style.width = "280px"
        }
    })
})