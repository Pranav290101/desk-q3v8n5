// Runs in the background on your iPhone. Wakes up when a push arrives and shows a notification.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = {}; }
  event.waitUntil(
    self.registration.showNotification(data.title || 'Organiser', {
      body: data.body || 'You have a reminder.',
      icon: 'icon.png',
      tag: data.tag || 'organiser'
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
