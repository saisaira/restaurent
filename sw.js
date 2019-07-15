// install event
CACHE_NAME = 'my-db';
this.addEventListener('install',(event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache)=>{
      cache.addAll([
          
      ])
    })
  )
})
self.addEventListener('activate', function(event) {

  var listCache = ['pages-cache-v1', 'blog-posts-cache-v1'];
  console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (listCache.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
            // console.log("deleted");
          }
        })
      );
    })
  );
});
// fetch event
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.open(CACHE_NAME)
    .then((cache)=>{
      return cache.match(event.request)
      .then((res)=>{
        return res || fetch(event.request)
        .then((res)=>{
          cache.put(event.request,res.clone());
          return res;
        });
      });
    })
  )
})
