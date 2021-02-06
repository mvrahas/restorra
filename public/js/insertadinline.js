let $ad = document.createElement('DIV')
let $adCaptionLink = document.createElement('A')
const article2 = document.querySelector('#config-data');


const insertAdInline = function(amplitudeapikey) {

    var ele = document.getElementById('main')
        
    fetch('/ads?restaurant=jeffersontap')
    .then(response => response.json())
    .then((data) => {
        var randSelection = Math.floor(Math.random() * data.length)
        var currentAd = data[randSelection]
    
        $adCaptionLink.href = currentAd.link
        $ad.style.position = 'relative'
        $ad.style.width = '100%'
        $ad.style.padding = '52.7% 0 0 0'
        $ad.style.margin = '0 0 50px 0'
        $ad.style.backgroundImage = 'url('+currentAd.image_url+')'
        $ad.style.boxShadow = '2px 10px 18px #00000030'
        $ad.style.backgroundSize = 'cover'
        $ad.style.zIndex = '1000000'
        $ad.id = 'testad'
        $adCaptionLink.appendChild($ad);
    
        let insertedNode = ele.insertBefore($adCaptionLink, ele.childNodes[2])
    
    })

    amplitude.getInstance().init(amplitudeapikey)
    var eventProperties = {
        'restaurant_name': 'jeffersontap'
    }
    amplitude.getInstance().logEvent('Menu_Viewed', eventProperties)

}
