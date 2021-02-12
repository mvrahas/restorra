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



// Fetch adds, create ad element, and track menu viewed event
let $ad = document.createElement('DIV')
const insertAdInline = function() {

    var ele = document.getElementById('main')    
    fetch('/ads?restaurant=jeffersontap')
    .then(response => response.json())
    .then((data) => {
        var randSelection = Math.floor(Math.random() * data.length)
        var currentAd = data[randSelection]
    
        $ad.style.position = 'relative'
        $ad.setAttribute('onclick','linkToPage("'+currentAd.link+'","'+currentAd.caption+'")')
        $ad.style.width = '100%'
        $ad.style.padding = '52.7% 0 0 0'
        $ad.style.margin = '0 0 50px 0'
        $ad.style.backgroundImage = 'url('+currentAd.image_url+')'
        $ad.style.boxShadow = '2px 10px 18px #00000030'
        $ad.style.backgroundSize = 'cover'
        $ad.style.zIndex = '1000000'
        $ad.id = 'testad'
        let insertedNode = ele.insertBefore($ad, ele.childNodes[2])

        window.addEventListener('scroll', function (event) {
            if (isInViewport($ad) && didTrackImpressionEvent == false) {
	            trackImpressionEvent(currentAd.caption)
	        }
        }, false)
    })

}