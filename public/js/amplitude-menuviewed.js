const article = document.querySelector('#config-data');

amplitude.getInstance().init(article.dataset.amplitudeapikey);
var eventProperties = {
    'restaurant_name': article.dataset.restaurantname
}

window.addEventListener('load', async (event) => {
    amplitude.getInstance().logEvent('Menu_Viewed', eventProperties);
})