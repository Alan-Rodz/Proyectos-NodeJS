import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchListComponent } from './launch-list/launch-list.component';
import { LaunchDetailsComponent } from './launch-details/launch-details.component';


//La ruta raiz es el componente LaunchList
//Si dan click en una de las cartas de lanzamiento 
//El usuario será llevado a una url con ese parametro en el id y mostrará el launchdetailscomponent con ese id 
const routes: Routes = [
  {
    path: '',
    component: LaunchListComponent
  },
  {
    path: ':id',
    component: LaunchDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
