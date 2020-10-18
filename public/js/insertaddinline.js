
let $ad = document.createElement('DIV')
let $adCaption = document.createElement('P')
let $adCaptionLink = document.createElement('A')

    window.addEventListener('load', async (event) => {
            var ele = document.getElementById('main')
            
            fetch('/ads')
            .then(response => response.json())
            .then((data) => {
                var randSelection = Math.floor(Math.random() * data.length)
                var currentAd = data[randSelection]

                $adCaptionLink.href = currentAd.link
                $ad.style.position = 'relative'
                $ad.style.width = '300px'
                $ad.style.height = '160px'
                $ad.style.margin = '20px'
                $ad.style.backgroundImage = 'url('+currentAd.image_url+')'
                $ad.style.backgroundSize = 'cover'
                $ad.style.zIndex = '1000000'
                $ad.id = 'testad'
                $adCaptionLink.appendChild($ad);

                let adCaptionText = document.createTextNode(currentAd.caption)
                $adCaption.id = 'testcaption'
                $adCaption.style.color = 'white'
                $adCaption.style.fontFamily = 'Arial, Helvetica, sans-serif'
                $adCaption.style.fontSize = '18px'
                $adCaption.style.background = 'black'
                $adCaption.style.padding = '0 0 0 3px'
                $adCaption.style.zIndex = '2000000'
                $adCaption.style.borderRadius = '7px'
                $adCaption.appendChild(adCaptionText)
                $ad.appendChild($adCaption)

                let insertedNode = ele.insertBefore($adCaptionLink, ele.childNodes[2])

            })

    })
