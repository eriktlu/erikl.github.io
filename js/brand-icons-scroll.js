/*
THIS SCRIPT IS FOR INDEX PAGE

THIS SCRIPT IS FOR BRANDS SCROLL

UPDATES ARROW COLORUS, SCROLLS ON ARROW CLICK, RESETS ON WINDOW RESIZE, ETC...
*/

var metrics = {}

var current = 0

var containerR = document.getElementById('iBrandOuter')
var bar = document.getElementById('iBrandBar')

var brandCard = document.getElementsByClassName('index-brand-card')[0]

var brandCardStyle = window.getComputedStyle(brandCard)


/*SWIPE CONTROL*/

containerR.addEventListener('touchstart', handleTouchStart, false);        
containerR.addEventListener('touchmove', handleTouchMove, false);

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

function setMetrics() {
	metrics = {
		bar: bar.scrollWidth || 0,
		container: containerR.clientWidth || 0,
	}
}

function doSlide(direction) {
	setMetrics()

	if (direction === 'right') {
		amountToScroll = -metrics.container
	} else {
		amountToScroll = metrics.container
	}

	current += amountToScroll

	if (Math.abs(current) + metrics.container >= metrics.bar) {
		current =
			-metrics.bar + metrics.container - parseInt(brandCardStyle.marginLeft)
		document
			.getElementsByClassName('arrow-right')[0]
			.classList.add('text-light')
	} else {
		document
			.getElementsByClassName('arrow-right')[0]
			.classList.remove('text-light')
	}

	if (current >= 0) {
		current = 0
		document.getElementsByClassName('arrow-left')[0].classList.add('text-light')
	} else {
		document
			.getElementsByClassName('arrow-left')[0]
			.classList.remove('text-light')
	}

	bar.style.left = current + 'px'
	setTimeout(function () {
		setMetrics()
	}, 400)
}

function adjust() {
	bar.style.left = 0
	setMetrics()
}

document
	.getElementsByClassName('toggleRight')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlide('right')
	})

document
	.getElementsByClassName('toggleLeft')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlide('left')
	})

window.addEventListener('resize', function () {
	// reset to left pos 0 on window resize
	current = 0
	document.getElementsByClassName('arrow-left')[0].classList.add('text-light')
	document
			.getElementsByClassName('arrow-right')[0]
			.classList.remove('text-light')
	adjust()
})

setMetrics()
