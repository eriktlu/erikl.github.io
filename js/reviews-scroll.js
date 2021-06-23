/*
THIS SCRIPT IS FOR INDEX PAGE

THIS SCRIPT IS FOR REVEIWS SCROLL

UPDATES ARROW COLORUS, SCROLLS ON ARROW CLICK, RESETS ON WINDOW RESIZE, ETC...
*/

var reviewMetrics = {}

var reviewCurrent = 0

var reviewContainer = document.getElementById('iReviewOuter')
var reviewBar = document.getElementById('iReviewBar')

var reviewCard = document.getElementsByClassName('index-review-card')[0]

var reviewCardStyle = window.getComputedStyle(reviewCard)


/*SWIPE CONTROL*/

reviewContainer.addEventListener('touchstart', handleTouchStart, false);        
reviewContainer.addEventListener('touchmove', handleTouchMove, false);

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
			reviewDoSlide('right')
        } else {
            /* right swipe */
			reviewDoSlide('left')
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}


function reviewSetMetrics() {
	reviewMetrics = {
		reviewBar: reviewBar.scrollWidth || 0,
		reviewContainer: reviewContainer.clientWidth || 0,
	}
}

function reviewDoSlide(direction) {
	reviewSetMetrics()

	if (reviewMetrics.reviewContainer >= reviewMetrics.reviewBar) {
		document
			.getElementsByClassName('arrow-right-reviews')[0]
			.classList.add('text-light')
	} else {
		if (direction === 'right') {
			amountToScroll =
				-reviewMetrics.reviewContainer
		} else {
			amountToScroll =
				reviewMetrics.reviewContainer
		}

		reviewCurrent += amountToScroll

		if (
			Math.abs(reviewCurrent) + reviewMetrics.reviewContainer >
			reviewMetrics.reviewBar
		) {
			reviewCurrent =
				-reviewMetrics.reviewBar +
				reviewMetrics.reviewContainer -
				parseInt(reviewCardStyle.marginLeft)

			document
				.getElementsByClassName('arrow-right-reviews')[0]
				.classList.add('text-light')
		} else {
			document
				.getElementsByClassName('arrow-right-reviews')[0]
				.classList.remove('text-light')
		}

		if (reviewCurrent >= 0) {
			reviewCurrent = 0
			document
				.getElementsByClassName('arrow-left-reviews')[0]
				.classList.add('text-light')
		} else {
			document
				.getElementsByClassName('arrow-left-reviews')[0]
				.classList.remove('text-light')
		}

		reviewBar.style.left = reviewCurrent + 'px'
		setTimeout(function () {
			reviewSetMetrics()
		}, 400)
	}
}

function reviewAdjust() {
	reviewBar.style.left = 0
	reviewSetMetrics()
}

document
	.getElementsByClassName('toggleRight-reviews')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		reviewDoSlide('right')
	})

document
	.getElementsByClassName('toggleLeft-reviews')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		reviewDoSlide('left')
	})

window.addEventListener('resize', function () {
	// reset to left pos 0 on window resize
	reviewCurrent = 0

	document
	.getElementsByClassName('arrow-left-reviews')[0]
	.classList.add('text-light')
	document
				.getElementsByClassName('arrow-right-reviews')[0]
				.classList.remove('text-light')

	reviewAdjust()
})

reviewSetMetrics()
