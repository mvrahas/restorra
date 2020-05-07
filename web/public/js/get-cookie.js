getCookie = async function (req, res, next) {
    try {
        const name = 'token'
        const cookie = req.headers.cookie
        var v = cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        req.token = v ? v[2] : null;
        return next()
    } catch (e) {
        return res.redirect('/index')
    }
}

module.exports = getCookie