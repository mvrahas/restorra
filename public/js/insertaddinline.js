
let $add = document.createElement('DIV')
let $addCaption = document.createElement('P')
let $addCaptionLink = document.createElement('A')

    window.addEventListener('load', async (event) => {
            var ele = document.getElementById('main')
            
            fetch('https://v2-api.sheety.co/c8d0b3b214a817554114d96220e3c881/restoAdds/adds')
            .then(response => response.json())
            .then((data) => {
                var randSelection = Math.floor(Math.random() * data.adds.length)
                var currentAdd = data.adds[randSelection]

                $addCaptionLink.href = currentAdd.addLink

                $add.style.position = 'relative'
                $add.style.width = '300px'
                $add.style.height = '160px'
                $add.style.margin = '20px'
                $add.style.backgroundImage = 'url('+currentAdd.addImageUrl+')'
                $add.style.backgroundSize = 'cover'
                $add.style.zIndex = '1000000'
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

                let insertedNode = ele.insertBefore($addCaptionLink, ele.childNodes[2])

            })

    })
