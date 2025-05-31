const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultAdminLayout.vue'),
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
    name: 'LoginPage',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
