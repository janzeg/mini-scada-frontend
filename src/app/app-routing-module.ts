import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessView } from './components/process-view/process-view';
import { RecipeManagerComponent } from './components/recipe-manager-component/recipe-manager-component';
import { AlarmsComponent } from './components/alarms-component/alarms-component';

const routes: Routes = [
  { path: '', component: ProcessView }, // domyślna trasa
  { path: 'processView', component: ProcessView },
  { path: 'recipes', component: RecipeManagerComponent },
  { path: 'alarms', component: AlarmsComponent },
  { path: '**', component: ProcessView  } // przekierowanie w razie błędnej ścieżki
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
