import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {StudyRoomComponent} from './study-room/study-room.component'

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'study-room',
  component: StudyRoomComponent
},
{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
{path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
