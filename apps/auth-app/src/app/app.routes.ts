import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Route[] = [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', component: AuthComponent},
];
