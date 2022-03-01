import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorporativoEditRoutingModule } from './corporativo-edit-routing.module';
import { CorporativoEditComponent } from './corporativo-edit.component';
import { CorporativoEditService } from './_services/comporativo-edit.service';

@NgModule({
  declarations: [CorporativoEditComponent],
  imports: [
    CommonModule,
    CorporativoEditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers: [CorporativoEditService]
})
export class CorporativoEditModule { }
