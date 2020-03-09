const cacheName = 'cache-v1';

const cacheAssets = [
  './fonts/Lato-Bold.ttf',
  './fonts/Lato-BoldItalic.ttf',
  './fonts/Lato-Italic.ttf',
  './fonts/Lato-Regular.ttf',
  './fonts/RobotoSlab-Bold.ttf',
  './fonts/RobotoSlab-Regular.ttf',

  './images/code_closure_file.png',
  './images/code_component_file.png',
  './images/code_page_file.png',
  './images/code_service_file_typescript.png',
  './images/code_service_file.png',
  './images/folder_content_folder.png',
  './images/folder_function_folder.png',
  './images/folder_model_multiple.png',
  './images/folder_model_regular.png'
];

const onInstall = event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cacheAssets)
      })
    .catch(error => console.warn("Failed to open cache named", cacheName, error))
  );
};

const onFetch = event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
    .catch(error => console.warn("Failed to match cache resources"))
  );
};

self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);