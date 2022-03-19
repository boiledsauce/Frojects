document.addEventListener("DOMContentLoaded", function() {

    let isShowingMobileSidebar = false

    const sidebar = document.querySelector("#sidebar")

    const toggleButton = document.querySelector("#sidebar-toggler")

    const sideBarAnchors = document.querySelectorAll('#sidebar .nav a')

    for (const anchor of sideBarAnchors){
        anchor.addEventListener('click', (event) => {
            if (userHasSmallScreen()){
                hideSidebar()
            }
        })
    }

    adjustSidebarToNavbar()

    if (userHasSmallScreen()) {
        hideSidebar()
    }

    makeSidebarVisible()

    toggleButton.addEventListener("click", function() {
        if (isShowingMobileSidebar) {
            hideSidebar()
        } else {
            showSideBarMobile()
        }
    })

    window.addEventListener("resize", function() {

        adjustSidebarToNavbar()

        if (userHasSmallScreen() && isShowingMobileSidebar){
            showSideBarMobile()
        }

        if (!userHasSmallScreen()) {
            adjustSidebarToDesktop()
        } else if (isShowingMobileSidebar){
            showSideBarMobile()
        }
        else {
            hideSidebar()
        }

    })

    function adjustSidebarToNavbar(){
        const navbar = document.querySelector("nav")

        sidebar.style.marginTop = navbar.offsetHeight + "px"
        sidebar.style.height = window.innerHeight - navbar.offsetHeight + "px"
    }

    function adjustSidebarToDesktop(){
        sidebar.style.width = null
        sidebar.style.marginLeft = "0px"
    }

    function showSideBarMobile(){
        sidebar.style.marginLeft = "0px"
        sidebar.style.width = "70%"
        isShowingMobileSidebar = true
        toggleButton.querySelector("i").setAttribute("class", "bi bi-x")
    }

    function hideSidebar(){
        sidebar.style.marginLeft = -sidebar.offsetWidth + "px"
        isShowingMobileSidebar = false
        toggleButton.querySelector("i").setAttribute("class", "bi bi-list")
    }

    function makeSidebarVisible(){
        sidebar.style.visibility = "visible"
    }

    function userHasSmallScreen(){
        return (window.innerWidth < 992)
    }

})