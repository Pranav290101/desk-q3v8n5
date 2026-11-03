// Runs in the background on your iPhone. Wakes up when a push arrives and shows a notification.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('push', event => {
  // The test push carries no message, so the text is fixed here.
  event.waitUntil(
    self.registration.showNotification('Organiser test', {
      body: 'It works. This push reached your iPhone.',
      icon: 'icon.png',
      tag: 'organiser-test'
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(list =>
      list.length ? list[0].focus() : self.clients.openWindow('./')
    )
  );
});
