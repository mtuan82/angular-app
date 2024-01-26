import { Routes } from '@angular/router';
import { ComponentSideNav } from './features/components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    { 
        path: 'home', 
        component: HomeComponent
    },
    { 
        path: 'login', 
        component: LoginComponent
    },
    { 
        path: 'register', 
        component: RegisterComponent
    },
];
