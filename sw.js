
let staticCacheName = 'resturant-review-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      let files = [
        '/',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'img/'
      ]

      for(let i = 1; i < 11; i++){
        files.push('img/' + i + '.jpg')
      }
      
      return cache.addAll(files);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('resturant-review') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});