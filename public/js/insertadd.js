
let $add = document.createElement('DIV')
let $addCaption = document.createElement('P')
let $addCaptionLink = document.createElement('A')

    window.addEventListener('load', async (event) => {
            

            fetch('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/adds')
            .then(response => response.json())
            .then((data) => {
                var randSelection = Math.floor(Math.random() * data.adds.length)
                var currentAdd = data.adds[randSelection]

                $addCaptionLink.href = currentAdd.addLink
                document.body.appendChild($addCaptionLink)

                $add.style.position = 'fixed'
                $add.style.bottom = '-300px'
                $add.style.width = 'calc(100vw - 40px)'
                $add.style.height = '160px'
                $add.style.margin = '20px'
                $add.style.backgroundImage = 'url('+currentAdd.addImageUrl+')'
                $add.style.backgroundSize = 'cover'
                $add.style.zIndex = '1000000'
                $add.style.transition = 'bottom 1s'
                $add.style.borderRadius = '7px'
                $add.id = 'testadd'
                $addCaptionLink.appendChild($add);

                let addCaptionText = document.createTextNode(currentAdd.title)
                $addCaption.id = 'testcaption'
                $addCaption.style.color = 'white'
                $addCaption.style.fontFamily = 'Arial, Helvetica, sans-serif'
                $addCaption.style.fontSize = '18px'
                $addCaption.style.background = 'black'
                $addCaption.style.padding = '0 0 0 3px'
                $addCaption.style.zIndex = '2000000'
                $addCaption.style.borderRadius = '7px'
                $addCaption.appendChild(addCaptionText)
                $add.appendChild($addCaption)

                setTimeout(() => {
                    tryDisplay()
                }, 4000)
            })


    })

    const tryDisplay = function() {
        setTimeout(() => {
            if(document.documentElement.scrollTop > 300) {
                $add.style.bottom = '0px'
            } else {
                tryDisplay()
            }
        }, 2000)
    }