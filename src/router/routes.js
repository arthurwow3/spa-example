const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin',
        component: () => import('pages/AdminPage.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'editor',
        component: () => import('pages/EditorPage.vue'),
        meta: { requiresAuth: true, roles: ['editor'] },
      },
      {
        path: 'viewer',
        component: () => import('pages/ViewerPage.vue'),
        meta: { requiresAuth: true, roles: ['viewer'] },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
