import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab3',
    loadComponent: () => import('./tab3/tab3.page').then( m => m.Tab3Page)
  },
];
