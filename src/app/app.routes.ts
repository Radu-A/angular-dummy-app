import { Routes } from '@angular/router';
import { ProductList } from './features/product-list/product-list';
import { ProductDetails } from './features/product-details/product-details';
import { LoginView } from './features/login-view/login-view';

export const routes: Routes = [
  {
    path: 'articles',
    redirectTo: '/products',
  },
  {
    path: 'products',
    component: ProductList,
  },
  {
    path: 'details',
    component: ProductDetails,
  },
  {
    path: 'login',
    component: LoginView,
  },
];
