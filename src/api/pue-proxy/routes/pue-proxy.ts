/**
 * pue-proxy router
 *
 * Not backed by a content-type — this is a stateless passthrough, so it's a
 * plain routes object rather than `factories.createCoreRouter`.
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/pue-proxy',
      handler: 'pue-proxy.index',
      config: { auth: false },
    },
  ],
};
