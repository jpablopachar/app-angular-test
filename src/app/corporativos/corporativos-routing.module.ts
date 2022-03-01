import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporativosComponent } from './corporativos.component';

const routes: Routes = [
  {
    path: '',
    component: CorporativosComponent,
    data: {
      title: 'Corporativos'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativosRoutingModule { }
