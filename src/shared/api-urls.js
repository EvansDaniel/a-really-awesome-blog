const API_BASE = '',
    API_VERSION = 'v1',
    API_DOMAIN = 'http://api.politicsinvogue.com';

let API_URLS_SHORTS = {
    article: 'article',
    createArticle: 'article/create',
};

let API_URLS = {};

for(let key in API_URLS_SHORTS) {
    const isProd = process.env.NODE_ENV === 'production';
    if(API_URLS_SHORTS.hasOwnProperty(key)) {
        if(isProd) {
            API_URLS[key] = `${API_DOMAIN}/${API_VERSION}/${API_URLS_SHORTS[key]}`
        } else {
            API_URLS[key] = `/${API_VERSION}/${API_URLS_SHORTS[key]}`
        }
        console.log(API_URLS[key]);
    }
}

console.log(API_URLS);

module.exports = API_URLS;