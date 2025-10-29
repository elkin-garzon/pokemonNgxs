import { Routes } from '@angular/router';
import { BaseComponent } from './layouts/base/base.component';
import { provideStates } from '@ngxs/store';
import { statusList } from '@store/index';

export const ROUTER_POKEMON: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: 'pokemon-ngxs',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
                providers: [provideStates(statusList)],
            },
        ]
    }
];
