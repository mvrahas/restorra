    var $add = document.createElement('DIV');
    $add.style.position = 'fixed'
    $add.style.bottom = '-300px'
    $add.style.width = 'calc(100vw - 40px)'
    $add.style.height = '200px'
    $add.style.margin = '20px'
    $add.style.backgroundImage = 'url(https://img.grouponcdn.com/deal/cUUZE66o46Qg1GCWtu49/Fp-4764x2858/v1/c700x420.jpg)'
    $add.style.backgroundSize = 'cover'
    $add.style.zIndex = '1000000'
    $add.style.transition = 'bottom 1s'
    $add.id = 'testadd'
    document.body.appendChild($add);

    console.log($add.style.position)
    console.log($add)
    console.log('hey')

    const tryDisplay = function() {
        console.log('try display')
        setTimeout(() => {
            if(document.documentElement.scrollTop > 300) {
                $add.style.bottom = '0px'
                console.log('displayed')
            } else {
                tryDisplay()
            }
        }, 2000)
    }

    window.addEventListener('load', (event) => {

        setTimeout(() => {
            tryDisplay()
        }, 4000)
    })