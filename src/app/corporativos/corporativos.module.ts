import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorporativosRoutingModule } from './corporativos-routing.module';
import { CorporativosComponent } from './corporativos.component';
import { CorporativosService } from './_services/corporativos.service';

@NgModule({
  declarations: [CorporativosComponent],
  imports: [
    CommonModule,
    CorporativosRoutingModule,
    NgxDatatableModule
  ],
  providers: [CorporativosService]
})
export class CorporativosModule { }
