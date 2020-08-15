function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}


const token = getCookie('token')

get = async function(route) {
    const options = {
        headers: {
            "Authorization" : "Bearer " + token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    }

    try {
        const data = await fetch(route,options)
        const json_data = data.json()
        if(json_data.error) {
            return json_data.error
        } else {
            return json_data
        }
    } catch (e) {
        console.log(e)
    }

}


post = async function(body,route,includeAuth) {

    const options = { 
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
    if(includeAuth) {
        options.headers["Authorization"] = "Bearer " + token
    }
    
    try {
        const data = await fetch(route,options)
        const json_data = data.json()
        if(json_data.error) {
            return json_data.error
        } else {
            return json_data
        }
    } catch (e) {
        console.log(e)
    }

}