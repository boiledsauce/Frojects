document.addEventListener("DOMContentLoaded", function() {

    const sidebar = document.querySelector("#sidebar")

    const toggleButton = document.querySelector("#sidebar-toggler")

    toggleButton.addEventListener("click", function() {
        if (sidebar.offsetWidth == 0) {
            sidebar.style.width = "70%"
            toggleButton.querySelector("i").setAttribute("class", "bi bi-x")
        } else {
            sidebar.style.width = "0px"
            toggleButton.querySelector("i").setAttribute("class", "bi bi-list")
        }
    })

    adjustSidebarToNavbar()

    window.addEventListener("resize", function() {
        adjustSidebarToNavbar()
        if (window.innerWidth >= 992) {
            adjustSidebarToDesktop()
        }
    })

    function adjustSidebarToNavbar(){
        sidebar.style.marginTop = document.querySelector("nav").offsetHeight + "px"
    }

    function adjustSidebarToDesktop(){
        sidebar.style.width = null
    }
})