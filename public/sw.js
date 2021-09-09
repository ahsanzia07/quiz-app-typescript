let cacheData = "appv1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/static/js/bundle.js",
                "/index.html",
                "/static/js/vendors~main.chunk.js",
                "/favicon.ico",
                "/manifest.json",
                "logo192.png",
                "/","/sockjs-node"
               
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if(navigator.onLine){

        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl=event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})