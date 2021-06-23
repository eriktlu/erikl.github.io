/*
THIS SCRIPT IS FOR REPAIR STATUS PAGE

THIS SCRIPT IS FOR STATUS SCROLL

UPDATES ARROW COLORUS, SCROLLS ON ARROW CLICK, RESETS ON WINDOW RESIZE, ETC...
*/

var metricsStatus = {}

var currentPage = 0

var containerStatus = document.getElementById('statusOuter')
var barStatus = document.getElementById('statusBar')

var statusCardGroup = document.getElementsByClassName('status-card')
var statusCard = document.getElementsByClassName('status-card')[0]

var statusCardStyle = window.getComputedStyle(statusCard)

var mobile

window.onload = setStatusBarLeft()
window.onload = statusBarCounter()
window.onload = setBookmark()

var currentStatus = parseInt(barStatus.style.left)
var startState = parseInt(barStatus.style.left)


/*SWIPE CONTROL*/

containerStatus.addEventListener('touchstart', handleTouchStart, false);        
containerStatus.addEventListener('touchmove', handleTouchMove, false);

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
            // left swipe  
			doSlideStatus('right')
        } else {
            // right swipe
			doSlideStatus('left')
        }                       
    }
    // reset values
    xDown = null;
    yDown = null;                                             
}


function setStatusBarLeft() {
	if (window.getComputedStyle(barStatus).getPropertyValue('left') === '1px') {
		mobile = false
		barStatus.style.left =
			statusCard.clientWidth + parseInt(statusCardStyle.marginLeft) * 2 + 'px'
	} else {
		mobile = true
		barStatus.style.left = 0 + 'px'
		document.getElementsByClassName('status-counter-number')[0].style.display = 'block'
	}
	return
}

function statusBarCounter() {
	var counterGroup = document.getElementsByClassName('status-counte-group')[0]

	var currentStatusCount = document.getElementsByClassName('current-status-count')
	var statusCount = document.getElementsByClassName('total-status-count')

	for (i = 0; i < currentStatusCount.length; i++) {
		currentStatusCount[i].innerHTML = i + 1
	}

	for (i = 0; i < statusCount.length; i++) {
		statusCount[i].innerHTML = statusCardGroup.length
	}

	if (!document.getElementsByClassName('status-current-counter')[0]) {
		for (i = 0; i < statusCardGroup.length; i++) {
			var cDiv = document.createElement('div')

			cDiv.classList.add('status-current-counter')
			counterGroup.appendChild(cDiv)
		}
	} else {
		for (i = 0; i < statusCardGroup.length; i++) {
			document
				.getElementsByClassName('status-current-counter')
			[i].classList.remove('finished-reading')
			document
				.getElementsByClassName('status-current-counter')
			[i].classList.remove('reading')
		}
	}
}

function setBookmark() {
	document.getElementsByClassName('status-card-icon')[0].style.display = 'block'
}

function setMetricsStatus() {
	metricsStatus = {
		barStatus: barStatus.scrollWidth || 0,
		container: containerStatus.clientWidth || 0,
		statusCard: statusCard.clientWidth || 0,
	}
}

function doSlideStatus(direction) {
	setMetricsStatus()

	if (direction === 'right') {
		amountToScroll =
			-metricsStatus.statusCard -
			parseInt(statusCardStyle.marginLeft) -
			parseInt(statusCardStyle.marginRight)
		if (currentPage < statusCardGroup.length - 1) {
			currentPage++

			statusCardGroup[currentPage].children[1].classList.remove('not-focus')
			statusCardGroup[currentPage - 1].children[1].classList.add('not-focus')

			document.getElementsByClassName('status-card-icon')[currentPage].style.display = 'block'
			document.getElementsByClassName('status-card-icon')[currentPage - 1].style.display = 'none'

			if (mobile === true) {
				document.getElementsByClassName('status-counter-number')[currentPage].style.display = 'block'
				document.getElementsByClassName('status-counter-number')[currentPage - 1].style.display = 'none'
			}


			document
				.getElementsByClassName('status-current-counter')
			[currentPage].classList.add('reading')
			document
				.getElementsByClassName('status-current-counter')
			[currentPage - 1].classList.remove('reading')
			document
				.getElementsByClassName('status-current-counter')
			[currentPage - 1].classList.add('finished-reading')


		}
	} else {
		amountToScroll =
			metricsStatus.statusCard +
			parseInt(statusCardStyle.marginLeft) +
			parseInt(statusCardStyle.marginRight)
		if (currentPage > 0) {
			currentPage--

			statusCardGroup[currentPage].children[1].classList.remove('not-focus')
			statusCardGroup[currentPage + 1].children[1].classList.add('not-focus')

			document.getElementsByClassName('status-card-icon')[currentPage].style.display = 'block'
			document.getElementsByClassName('status-card-icon')[currentPage + 1].style.display = 'none'


			if (mobile === true) {
				document.getElementsByClassName('status-counter-number')[currentPage].style.display = 'block'
				document.getElementsByClassName('status-counter-number')[currentPage + 1].style.display = 'none'
			}


			document
				.getElementsByClassName('status-current-counter')
			[currentPage].classList.add('reading')
			document
				.getElementsByClassName('status-current-counter')
			[currentPage].classList.remove('finished-reading')
			document
				.getElementsByClassName('status-current-counter')
			[currentPage + 1].classList.remove('reading')

			document.getElementsByClassName('current-status-count')[currentPage].innerHTML =
				currentPage + 1
		}
	}

	currentStatus += amountToScroll
	
	if(mobile === false) {

		if (
			currentStatus -
			metricsStatus.statusCard * 2 -
			parseInt(statusCardStyle.marginLeft) * 3 <=
			-metricsStatus.barStatus
		) {
			currentStatus =
				-metricsStatus.barStatus +
				metricsStatus.statusCard * 2 +
				parseInt(statusCardStyle.marginLeft) * 3
			document
				.getElementsByClassName('arrow-right-status')[0]
				.classList.add('text-light')

			return barStatus.style.left = currentStatus + 'px'
		} else {
			document
				.getElementsByClassName('arrow-right-status')[0]
				.classList.remove('text-light')
		}
		
		if (currentStatus >= metricsStatus.statusCard) {
			currentStatus =
				metricsStatus.statusCard + parseInt(statusCardStyle.marginLeft) * 2
			document
				.getElementsByClassName('arrow-left-status')[0]
				.classList.add('text-light')
			
			return barStatus.style.left = currentStatus + 'px'
		} else {
			document
				.getElementsByClassName('arrow-left-status')[0]
				.classList.remove('text-light')
		}

		
		
	}

	if (mobile === true) {
		if (currentStatus >= 0) {
			currentStatus = 0
			document
				.getElementsByClassName('arrow-left-status')[0]
				.classList.add('text-light')
			return barStatus.style.left = currentStatus + 'px'
		} else {
			document
				.getElementsByClassName('arrow-left-status')[0]
				.classList.remove('text-light')
		}

		if (
			currentStatus -
			metricsStatus.statusCard -
			parseInt(statusCardStyle.marginLeft) <=
			-metricsStatus.barStatus
		) {
			currentStatus =
				-metricsStatus.barStatus +
				metricsStatus.statusCard +
				parseInt(statusCardStyle.marginLeft)

			document.getElementsByClassName('arrow-right-status')[0].classList.add('text-light')
			return barStatus.style.left = currentStatus + 'px'
		} else {
			document
				.getElementsByClassName('arrow-right-status')[0]
				.classList.remove('text-light')
		}
	}

	barStatus.style.left = currentStatus + 'px'
	setTimeout(function () {
		setMetricsStatus()
	}, 400)
}

function adjustStatus() {
	barStatus.style.left = startState + 'px'
	setMetricsStatus()
}

document
	.getElementsByClassName('toggleRight-status')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlideStatus('right')
	})

document
	.getElementsByClassName('toggleLeft-status')[0]
	.addEventListener('click', function (e) {
		e.preventDefault()
		doSlideStatus('left')
	})

window.addEventListener('resize', function () {
	// reset to left pos 0 on window resize

	statusCardGroup[currentPage].children[1].classList.add('not-focus')
	statusCardGroup[0].children[1].classList.remove('not-focus')

	document.getElementsByClassName('status-card-icon')[0].style.display = 'block'
	if (currentPage !== 0) document.getElementsByClassName('status-card-icon')[currentPage].style.display = 'none'

	if (mobile === true) {
		document.getElementsByClassName('status-counter-number')[0].style.display = 'block'
		if (currentPage !== 0) document.getElementsByClassName('status-counter-number')[currentPage].style.display = 'none'
	}

	currentStatus = startState
	currentPage = 0
	statusBarCounter()
	adjustStatus()
	document
		.getElementsByClassName('arrow-right-status')[0]
		.classList.remove('text-light')
	document
		.getElementsByClassName('arrow-left-status')[0]
		.classList.add('text-light')
})

setMetricsStatus()
