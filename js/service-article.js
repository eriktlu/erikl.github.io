/*
This script is for service article page.

These include scripts for pop up menu when clicking on the question mark, monthly price calculation based on the price, product menu opener, legal entity information window opener and device code lock opener



*/

var x = false

function openReadMore(e) {
    if (e.parentElement.nextSibling.nextSibling.style.display === 'flex') {
        closeReadmore(e, true)
        x = false
        return
    }

    if (
        e.parentElement.nextSibling.nextSibling.style.display === 'none' ||
        e.parentElement.nextSibling.nextSibling.style.display === ''
    ) {
        e.parentElement.nextSibling.nextSibling.style.display = 'flex'

        if (x) {
            x.parentElement.nextSibling.nextSibling.style.display = 'none'
        }
        x = e
    }
}

function closeReadmore(e, logic) {
    if (logic) {
        e.parentElement.nextSibling.nextSibling.style.display = 'none'
    } else {
        e.parentElement.style.display = 'none'
        x = false
    }
}

document
    .getElementsByClassName('price-number')[0]
    .addEventListener(
        'change',
        calculateMonthlyPrices(
            document.getElementsByClassName('price-number')[0].innerHTML
        )
    )

function calculateMonthlyPrices(price) {
    document.getElementById('three-months').innerHTML =
        Math.floor((price / 3) * 10) / 10
    document.getElementById('six-months').innerHTML =
        Math.floor((price / 6) * 10) / 10
    document.getElementById('twelve-months').innerHTML =
        Math.floor((price / 12) * 10) / 10
}

function showCompanyDetails() {
    var checkbox = document.getElementById('legal-entity-c')

    var companyDetails = document.getElementById('company-details')
    var companyDetailsField = document.getElementsByClassName('company-details-field')

    if (checkbox.checked == true) {
        companyDetails.style.display = 'block'
        for(i = 0; i < companyDetailsField.length; i++) {
            companyDetailsField[i].required = true
        }
    } else {
        companyDetails.style.display = 'none'
        for(i = 0; i < companyDetailsField.length; i++) {
            companyDetailsField[i].required = false
        }
    }
}

function openSelectProductMenu() {
    var dropDown = window.getComputedStyle(document.getElementById('selectProductMenuToggle')).display


    if (dropDown == 'none') {
        document.getElementById('selectProductMenuToggle').style.display = 'block'
    } else {
        document.getElementById('selectProductMenuToggle').style.display = 'none'
    }
}

function openDeviceCodeLock() {
    var deviceLock = document.getElementById('deviceLock')
    if(deviceLock.getAttribute('aria-expanded') === 'true') {
        deviceLock.setAttribute('aria-expanded', 'false')
        document.getElementById('deviceLock').style.display = 'none'
    } else {
        deviceLock.setAttribute('aria-expanded', 'true')
        document.getElementById('deviceLock').style.display = 'block'
    }
    
}

function setRequired() {

    if(document.getElementById('send-by-mail').checked === true) {
        for(i = 0; i < document.getElementsByClassName('address-mailing-field').length; i++){
            document.getElementsByClassName('address-mailing-field')[i].required = true
        }
    } else {
        for(i = 0; i < document.getElementsByClassName('address-mailing-field').length; i++){
            document.getElementsByClassName('address-mailing-field')[i].required = false
        }
    }

    if(document.getElementById('courier').checked === true) {
        for(i = 0; i < document.getElementsByClassName('pickup-location-field').length; i++){
            document.getElementsByClassName('pickup-location-field')[i].required = true
        }
    } else {
        for(i = 0; i < document.getElementsByClassName('pickup-location-field').length; i++){
            document.getElementsByClassName('pickup-location-field')[i].required = false
        }
    }
}
