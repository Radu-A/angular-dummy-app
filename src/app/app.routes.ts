import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { ProductList } from './features/product-list/product-list';
import { ProductDetails } from './features/product-details/product-details';
import { LoginView } from './features/login-view/login-view';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginView,
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductList,
          },
          {
            path: 'details',
            component: ProductDetails,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];
