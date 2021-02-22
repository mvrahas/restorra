// Link the ad to the desired page when clicked and track event
var linkToPage = function (link, caption) {
    var eventProperties = {
        'restaurant_name': 'jeffersontap',
        'ad_caption': caption
    }
    amplitude.getInstance().logEvent('Ad_Clicked', eventProperties)
    window.open(link,"_self")
}



// Function to track impression event
var didTrackImpressionEvent = false
var trackImpressionEvent = function (caption) {
    var eventProperties = {
        'restaurant_name': 'jeffersontap',
        'ad_caption': caption
    }
    console.log('hey')
    amplitude.getInstance().logEvent('Ad_Viewed', eventProperties)
    didTrackImpressionEvent = true
}



// Function to track Menu_Viewed Event
var trackMenuViewedEvent = function () {
    var eventProperties = {
        'restaurant_name': 'jeffersontap'
    }
    amplitude.getInstance().logEvent('Menu_Viewed', eventProperties)
}



// Tests whether the add is in the viewport or not
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};



// Create ad element and place on the menu
const insertAdInline = function() {

    var ele = document.getElementById('main')
    let $ad = document.createElement('DIV')
    let $caption = document.createElement('P')

    $ad.style.position = 'relative'
    $ad.setAttribute('onclick','linkToPage("https://www.theneoclean.com/","Neo-Clean Wipes")')
    $ad.style.width = '100%'
    $ad.style.padding = '52.7% 0 0 0'
    $ad.style.margin = '0 0 50px 0'
    $ad.style.backgroundImage = 'url("/img/neoclean.png")'
    $ad.style.boxShadow = '2px 10px 18px #00000030'
    $ad.style.backgroundSize = 'cover'
    $ad.style.zIndex = '1000000'
    $ad.id = 'testad'
	
    $caption.innerHTML = 'The best screen wipes out there!'
    $caption.style.display = 'block'
    $caption.style.position = 'absolute'
    $caption.style.bottom = '0px'
    $caption.style.fontFamily = 'Arial, sans-serif'
    $caption.style.textAlign = 'left'
    $caption.style.background = 'black'
    $caption.style.color = 'white'
    $caption.style.width = '100%'
    $ad.appendChild($caption)
    
    let insertedNode = ele.insertBefore($ad, ele.childNodes[2])

    window.addEventListener('scroll', function (event) {
        if (isInViewport($ad) && didTrackImpressionEvent == false) {
	        trackImpressionEvent("Neo-Clean Wipes")
	    }
    }, false)

}
