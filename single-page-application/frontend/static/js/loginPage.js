loadLoginPage = async () => {
    const h2 = document.createElement('h2')
    h2.innerText = "Hejsan hoppsan!"

    const loginPage = document.getElementById('login-page')
    loginPage.innerHTML = ''

    loginPage.appendChild(h2)
}