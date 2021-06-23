/*
THIS SCRIPT IS FOR INDEX PAGE

THIS SCRIPT IS FOR ADVANTAGES SCROLL

UPDATES ARROW COLORUS, SCROLLS ON ARROW CLICK, RESETS ON WINDOW RESIZE, ETC...
*/

var advantagesMetrics = {}

var article = document.getElementById('advantages-article')
var articleGroup = document.getElementById('advantages-article-group')

var advantagesCurrent = 0

var advantagesRightArrow = document.getElementById('advantages-arrow-right')
var advantagesLeftArrow = document.getElementById('advantages-arrow-left')


/*SWIPE CONTROL*/

articleGroup.addEventListener('touchstart', handleTouchStart, false);        
articleGroup.addEventListener('touchmove', handleTouchMove, false);

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
			advantagesDoSlide('right')
        } else {
            /* right swipe */
			advantagesDoSlide('left')
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}

function advantagesSetMetrics() {
	advantagesMetrics = {
		articleWidth: article.clientWidth || 0,
		articleGroupWidth: articleGroup.scrollWidth || 0,
	}
}

function advantagesDoSlide(direction) {
	advantagesSetMetrics()

	if (direction === 'right') {
		amountToScroll = -advantagesMetrics.articleWidth
	} else {
		amountToScroll = advantagesMetrics.articleWidth
	}

	advantagesCurrent += amountToScroll

	if (
		Math.abs(advantagesCurrent) + advantagesMetrics.articleWidth >=
		advantagesMetrics.articleGroupWidth
	) {
		advantagesCurrent =
			-advantagesMetrics.articleGroupWidth + advantagesMetrics.articleWidth

		advantagesRightArrow.classList.add('text-light')
	} else {
		advantagesRightArrow.classList.remove('text-light')
	}

	if (advantagesCurrent >= 0) {
		advantagesCurrent = 0
		advantagesLeftArrow.classList.add('text-light')
	} else {
		advantagesLeftArrow.classList.remove('text-light')
	}

	articleGroup.style.left = advantagesCurrent + 'px'
	setTimeout(function () {
		advantagesSetMetrics()
	}, 400)
}

function advantagesAdjust() {
	articleGroup.style.left = 0
	advantagesSetMetrics()
}

document
	.getElementsByClassName('toggleRight-advantages')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		advantagesDoSlide('right')
	})

document
	.getElementsByClassName('toggleLeft-advantages')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		advantagesDoSlide('left')
	})

window.addEventListener('resize', function () {
	// reset to left pos 0 on window resize
	advantagesCurrent = 0
	advantagesLeftArrow.classList.add('text-light')
	advantagesRightArrow.classList.remove('text-light')
	advantagesAdjust()
})

advantagesSetMetrics()
