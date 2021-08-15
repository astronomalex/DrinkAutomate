import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AutomateComponent} from './automate/automate.component';
import {KeyCheckGuard} from './_guards/key-check.guard';

const routes: Routes = [
  {path: '', component: AutomateComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [KeyCheckGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
