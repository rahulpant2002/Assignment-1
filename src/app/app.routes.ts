import { Routes } from '@angular/router';
import { Home } from './home/home';
import { DashBoard } from './dash-board/dash-board';
import { TaskDetail } from './task-detail/task-detail';

export const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    {path : '', component : Home},
    {path : 'dashboard', component : DashBoard},
    { path: 'task/:id', component: TaskDetail } 
];
