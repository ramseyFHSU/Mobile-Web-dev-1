const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/app.css",
  "/img/task.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", function (event) {
  //fires when the browser install the app
  //here we're just logging the event and the contents of the object passed to the event.
  //the purpose of this event is to give the service worker a place to setup the local
  //environment after the installation completes.
  console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      console.log("SW: Precaching App shell");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function (event) {
  //fires after the service worker completes its installation.
  // It's a place for the service worker to clean up from
  // previous service worker versions.
  console.log(`SW: Event fired: ${event.type}`);
});

self.addEventListener("fetch", function (event) {
  //fires whenever the app requests a resource (file or data)
  // console.log(`SW: Fetching ${event.request.url}`);
  //next, go get the requested resource from the network
  event.respondWith(fetch(event.request));
  caches.match(event.request).then((response) => {
    return response || fetch(event.request);
  });
});
