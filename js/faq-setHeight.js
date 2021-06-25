/*
This script is for the faq questions dropdown

This script adds height depending on how many questions added
*/

function setHeight(e) {
    if(e.checked){
        e.parentElement.getElementsByClassName('qa-group')[0].style.height = e.parentElement.getElementsByClassName('qa-group')[0].scrollHeight + 'px'
    } else {
        e.parentElement.getElementsByClassName('qa-group')[0].style.height = '0px'
    }
}