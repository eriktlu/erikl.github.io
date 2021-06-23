/*
	THIS IS A SCROLLING SCRIPT FOR SERVICE ARTICLE PAGE

	THIS IS A SCRIPT FOR SCROLLING REPAIR OPTIONS

	UPDATES ARROW COLORUS, SCROLLS ON ARROW CLICK, RESETS ON WINDOW RESIZE
*/

var metricsRepair = {}

var currentRepair = 0

var containerRepair = document.getElementById('repairOuter')
var barRepair = document.getElementById('repairBar')

var repairCard = document.getElementsByClassName('repair-card')[0]

var repairCardStyle = window.getComputedStyle(repairCard)


/*SWIPE CONTROL*/

containerRepair.addEventListener('touchstart', handleTouchStart, false);        
containerRepair.addEventListener('touchmove', handleTouchMove, false);

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
			doSlide('right')
        } else {
            /* right swipe */
			doSlide('left')
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}

function setMetricsRepair() {
	metricsRepair = {
		barRepair: barRepair.scrollWidth || 0,
		container: containerRepair.clientWidth || 0,
	}
}

function doSlide(direction) {
	setMetricsRepair()

	if (direction === 'right') {
		amountToScroll = -metricsRepair.container
	} else {
		amountToScroll = metricsRepair.container
	}

	currentRepair += amountToScroll

	if (currentRepair >= 0) {
		currentRepair = 0
		document
			.getElementsByClassName('arrow-left-repair')[0]
			.classList.add('text-light')
	} else {
		document
			.getElementsByClassName('arrow-left-repair')[0]
			.classList.remove('text-light')
	}

	if (
		Math.abs(currentRepair) + metricsRepair.container >
		metricsRepair.barRepair
	) {
		currentRepair =
			-metricsRepair.barRepair +
			metricsRepair.container -
			parseInt(repairCardStyle.marginLeft)
		document
			.getElementsByClassName('arrow-right-repair')[0]
			.classList.add('text-light')
	} else {
		document
			.getElementsByClassName('arrow-right-repair')[0]
			.classList.remove('text-light')
	}

	barRepair.style.left = currentRepair + 'px'
	setTimeout(function () {
		setMetricsRepair()
	}, 400)
}

function adjust() {
	barRepair.style.left = 0
	setMetricsRepair()
}

document
	.getElementsByClassName('toggleRight-repair')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlide('right')
	})

document
	.getElementsByClassName('toggleLeft-repair')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlide('left')
	})

window.addEventListener('resize', function () {
	// reset to left pos 0 on window resize
	currentRepair = 0
	adjust()
	document
		.getElementsByClassName('arrow-right-repair')[0]
		.classList.remove('text-light')
	document
		.getElementsByClassName('arrow-left-repair')[0]
		.classList.add('text-light')
})

setMetricsRepair()
