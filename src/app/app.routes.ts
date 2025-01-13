import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', title: 'Home', component: HomeComponent},
    {path: 'students', title: 'Students', component: StudentsComponent},
    {path: '**', title: 'Not found', component: PageNotFoundComponent}

];
