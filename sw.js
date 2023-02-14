//assign name and version in cache
const CACHE_NAME = 'v1_cache_dev'

//cacheables
var urlsCacheable = [
    './',
    './css/styles.css',
    './images/header-1.jpg',
    './images/1.png',
    './images/2.png',
    './images/3.png',
    './images/4.png',
    './images/5.png',
    './images/6.png',
    './images/facebook.png',
    './images/twitter.png',
    './images/instagram.png',
    './images/favicon.png',
    './images/favicon-16.png',
    './images/favicon-32.png',
    './images/favicon-64.png',
    './images/favicon-96.png',
    './images/favicon-128.png',
    './images/favicon-192.png',
    './images/favicon-256.png',
    './images/favicon-384.png',
    './images/favicon-512.png',
    './images/favicon-1024.png'
];

//install -- install service worker and cache save all resources
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsCacheable).then(() => { self.skipWaiting(); })
                .catch(err => {
                    console.log('error in cache...', err);
                });
        })
    );
});

//activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) == -1) {
                        //delete element not used
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => { 
            //activate cache -- important!
            self.clients.claim();
        })
    );
});


//fetch
self.addEventListener('fetch', e => {
    caches.match(e.request).then(res => {
        if(res){
            return res;
        }
        return fetch(e.request);
    })
});