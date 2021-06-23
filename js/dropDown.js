/*
This script is for the header dropdown in mobile devices.

This script stops the user to be able to scroll on the main page while the dropdown menu is opened.

Only for mobile devices
*/

function dropDown() {
    var img = document.getElementById('navMobMenu')

    if(getComputedStyle(img).getPropertyValue('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
        img.setAttribute('aria-expanded', 'true')
        
    }

    if (img.getAttribute('aria-expanded') === 'true') {
        img.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = 'visible'
    } else {
        img.setAttribute('aria-expanded', 'true')
        document.body.style.overflow = 'hidden'
    }
}