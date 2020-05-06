getCookie = async function (req, res, next) {
    const name = 'token'
    const cookie = req.headers.cookie
    var v = cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    req.token = v ? v[2] : null;
    return next()
}

module.exports = getCookie