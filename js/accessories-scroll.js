/*
	THIS IS A SCROLLING SCRIPT FOR SERVICE ARTICLE PAGE

	THIS IS A SCRIPT FOR SCROLLING DEVICE ACCESSORIES

	UPDATES ARROW COLORUS, SCROLLS ON ARROW CLICK, RESETS ON WINDOW RESIZE
*/

var metricsAccessories = {}

var currentAccessories = 0

var containerAccessories = document.getElementById('accessoriesOuter')
var barAccessories = document.getElementById('accessoriesBar')

var accessoriesCard = document.getElementsByClassName('accessories-card')[0]

var accessoriesCardStyle = window.getComputedStyle(accessoriesCard)

/*SWIPE CONTROL*/

containerAccessories.addEventListener('touchstart', handleTouchStart, false);        
containerAccessories.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches 
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
			doSlideAccessories('right')
        } else {
            /* right swipe */
			doSlideAccessories('left')
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}

function setMetricsAccessories() {
	metricsAccessories = {
		barAccessories: barAccessories.scrollWidth || 0,
		container: containerAccessories.clientWidth || 0,
	}
}

function doSlideAccessories(direction) {
	setMetricsAccessories()

	if (direction === 'right') {
		amountToScroll = -metricsAccessories.container
	} else {
		amountToScroll = metricsAccessories.container
	}

	currentAccessories += amountToScroll

	if (currentAccessories >= 0) {
		currentAccessories = 0
		document
			.getElementsByClassName('arrow-left-accessories')[0]
			.classList.add('text-light')
	} else {
		document
			.getElementsByClassName('arrow-left-accessories')[0]
			.classList.remove('text-light')
	}

	if (
		Math.abs(currentAccessories) + metricsAccessories.container >
		metricsAccessories.barAccessories
	) {
		currentAccessories =
			-metricsAccessories.barAccessories +
			metricsAccessories.container -
			parseInt(accessoriesCardStyle.marginLeft)
		document
			.getElementsByClassName('arrow-right-accessories')[0]
			.classList.add('text-light')
	} else {
		document
			.getElementsByClassName('arrow-right-accessories')[0]
			.classList.remove('text-light')
	}

	barAccessories.style.left = currentAccessories + 'px'
	setTimeout(function () {
		setMetricsAccessories()
	}, 400)
}

function adjustAccessories() {
	barAccessories.style.left = 0
	setMetricsAccessories()
}

document
	.getElementsByClassName('toggleRight-accessories')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlideAccessories('right')
	})

document
	.getElementsByClassName('toggleLeft-accessories')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlideAccessories('left')
	})

window.addEventListener('resize', function () {
	// reset to left pos 0 on window resize
	currentAccessories = 0
	adjustAccessories()
	document
		.getElementsByClassName('arrow-right-accessories')[0]
		.classList.remove('text-light')
	document
		.getElementsByClassName('arrow-left-accessories')[0]
		.classList.add('text-light')
})

setMetricsAccessories()
