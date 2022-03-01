import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Corporativos } from './_models/corporativos-response';
import { CorporativosService } from './_services/corporativos.service';

@Component({
  selector: 'app-corporativos',
  templateUrl: './corporativos.component.html',
  styleUrls: ['./corporativos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CorporativosComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows!: Corporativos[];
  public limitRef: number;
  public ColumnMode = ColumnMode;
  public columns: any;

  private _tempData!: Corporativos[];

  constructor(private readonly _corporativosService: CorporativosService) {
    this.limitRef = 10;
    this.columns = [
      { name: 'Corporativo', prop: 'corporativo' },
      { name: 'Url', prop: 'url' },
      { name: 'Incorporacion', prop: 'incorporacion' },
      { name: 'Creado el', prop: 'created' },
      { name: 'Asignado a', prop: 'asignado' },
      { name: 'Estado', prop: 'estado' },
      { name: 'Acciones', prop: 'id' }
    ];

    this.obtenerCorporativos();
  }

  ngOnInit(): void {
  }
  
  private obtenerCorporativos(): void {
    this._corporativosService.obtenerCorporativos().subscribe((res) => {
      this.rows = res.data;
      this._tempData = res.data;
      console.log(this.rows);
    });
  }

  public updateLimit(limit: any) {
    this.limitRef = limit.target.value;
  }

  public filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this._tempData.filter((d) => d.S_NombreCorto.toLowerCase().indexOf(val) !== -1 || !val);

    this.rows = temp;
    this.table.offset = 0;
  }
}
