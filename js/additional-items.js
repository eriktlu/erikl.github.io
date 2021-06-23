/*
This script is for a service article page

This script is for giving visual feedback to the user when adding repair options or accessories.
All the items are added seperately under the price and the total price is calculated.

This is front end only.
*/


function addItem(item) {
    var thisItem = item.parentElement.children[1].children[0]
    var additionalProductName = thisItem.getElementsByClassName('sa-name')[0].innerHTML
    var additionalProductPriceCurrency = thisItem.getElementsByClassName('ro-price')[0].innerHTML

    var additionalProductPrice = additionalProductPriceCurrency.replace("€", "");
    var currentPrice = document.getElementsByClassName('price-number')[0].innerHTML

    if(item.getAttribute('aria-expanded') === 'true') {

        item.setAttribute('aria-expanded', 'false')

        var length = document.getElementsByClassName('additional-item-title').length

        for (let i = 0; i < length; i++) {
            if(document.getElementsByClassName('additional-item-title')[i].innerHTML === additionalProductName){
                document.getElementsByClassName('additional-item')[i].remove()

                document.getElementsByClassName('price-number')[0].innerHTML = (((Number(currentPrice) * 100) - (Number(additionalProductPrice) * 100)) / 100).toFixed(2)
                return
            }
        }

    } else {
        item.setAttribute('aria-expanded', 'true')

        var node = document.createElement('small')
        node.classList.add('additional-item')
        node.innerHTML = "+ <span class='additional-item-price'>"+ additionalProductPriceCurrency +"</span> (<span class='additional-item-title'>"+ additionalProductName +"</span>)"
    
        document.getElementsByClassName('price-number')[0].innerHTML = (((Number(currentPrice) * 100) + (Number(additionalProductPrice) * 100)) / 100).toFixed(2)
    
        document.getElementsByClassName('additional-items')[0].appendChild(node)
        return
    }

    
}