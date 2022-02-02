document.addEventListener("DOMContentLoaded", function() {

    let showSidebar = true

    const sidebar = document.querySelector("#sidebar")

    adjustSidebarToNavbar()

    window.addEventListener("resize", function() {
        adjustSidebarToNavbar()
        if (window.innerWidth >= 992) {
            adjustSidebarToDesktop()
        }
    })

    if (window.innerWidth < 992) {
        
        const toggleButton = document.querySelector("#sidebar-toggler")

        toggleButton.addEventListener("click", function() {
            if (sidebar.offsetWidth == 0) {
                sidebar.style.width = "70%"
                showSidebar = true
            } else {
                sidebar.style.width = "0px"
                showSidebar = false
            }
        })
        
    }

    function adjustSidebarToNavbar(){
        sidebar.style.marginTop = document.querySelector("nav").offsetHeight + "px"
    }

    function adjustSidebarToDesktop(){
        sidebar.style.width = null
        showSidebar = true
    }
})