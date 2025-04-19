import { Routes } from '@angular/router';
import { BaseComponent } from './layouts/base/base.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
            },
        ]
    }
];
