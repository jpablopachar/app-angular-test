import { Location } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CorporativoEditService } from "./_services/comporativo-edit.service";

@Component({
  selector: "app-corporativo-edit",
  templateUrl: "./corporativo-edit.component.html",
  styleUrls: ["./corporativo-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CorporativoEditComponent implements OnInit {
  public isDisabled: boolean;
  public isEdit: boolean;
  public textCancel: string;
  public textEdit: string;
  public model: NgbDateStruct;
  public d3: any;
  public popupModel: any;
  public nombreCorto: string;
  public nombreCompleto: string;
  public status: number;
  public fechaIncorporacion: string;
  public url: string;
  public logo: string;
  public isLoading: boolean;
  public contactos!: any;
  public formContacto: FormGroup;
  public btnContacto: string;

  private _id: string;
  private _idContacto: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _location: Location,
    private readonly corporativoEditService: CorporativoEditService
  ) {
    this._id = "";
    this._idContacto = '';
    this.nombreCorto = "";
    this.nombreCompleto = "";
    this.status = 0;
    this.url = "";
    this.logo = "";
    this.isDisabled = true;
    this.isEdit = false;
    this.isLoading = false;
    this.textCancel = "Regresar";
    this.textEdit = "Editar";
    this.btnContacto = 'AGREGAR CONTACTO';
    this.formContacto = this.formBuilder.group({
      tw_corporativo_id: [null],
      S_Nombre: [null, Validators.required],
      S_Puesto: [null, Validators.required],
      N_TelefonoFijo: [null],
      N_TelefonoMovil: [null, Validators.required],
      S_Email: [null, Validators.required],
      S_Comentarios: [null]
    })
  }

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get("id");

    this.corporativoEditService
      .obtenerCorporativo(this._id)
      .subscribe((res) => {
        const now = new Date(res.data.corporativo.D_FechaIncorporacion);

        this.logo = res.data.corporativo.S_LogoURL;
        this.nombreCorto = res.data.corporativo.S_NombreCorto;
        this.nombreCompleto = res.data.corporativo.S_NombreCompleto;
        this.status = res.data.corporativo.S_Activo;
        this.url = res.data.corporativo.S_SystemUrl;
        this.model = {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
        };
        this.isLoading = true;
        this.contactos = res.data.corporativo.tw_contactos_corporativo;
      });
  }

  public edit(): void {
    this.textEdit = "Guardar Cambios";
    this.isDisabled = false;
    this.isEdit = true;
  }

  public cancel(): void {
    if (!this.isEdit) {
      this._location.back();
    } else {
      this.isDisabled = true;
      this.isEdit = false;
      this.textCancel = "Regresar";
      this.textEdit = "Editar";
    }
  }

  public agregarContacto(): void {
    if (this.formContacto.invalid) {
      return;
    }

    const id = this.formContacto.get('tw_corporativo_id').value;

    const body = {
      tw_corporativo_id: Number(this.formContacto.get('tw_corporativo_id').value),
      S_Nombre: this.formContacto.get('S_Nombre').value,
      S_Puesto: this.formContacto.get('S_Puesto').value,
      N_TelefonoFijo: Number(this.formContacto.get('N_TelefonoFijo').value),
      N_TelefonoMovil: Number(this.formContacto.get('N_TelefonoMovil').value),
      S_Email: this.formContacto.get('S_Email').value,
      S_Comentarios: this.formContacto.get('S_Comentarios').value
    }

    if (body.tw_corporativo_id === 0) {
      console.log(this._id);
      body.tw_corporativo_id = Number(this._id);

      this.corporativoEditService.agregarContacto(body).subscribe((res) => {
        this.contactos.push(res.data);
      })
    } else {
      this.corporativoEditService.actualizarContacto(this._idContacto, body).subscribe((res) => {
        const index = this.contactos.findIndex((contacto) => contacto.id === res.data.id);

        this.contactos[index] = res.data;
      })
    }

    this.formContacto.reset();
    this._idContacto = '';
    this.btnContacto = 'AGREGAR CONTACTO';
  }

  public editarContacto(contacto: any): void {
    this._idContacto = contacto.id;
    this.btnContacto = 'EDITAR CONTACTO';
    this.formContacto.setValue({
      tw_corporativo_id: contacto.tw_corporativo_id,
      S_Nombre: contacto.S_Nombre,
      S_Puesto: contacto.S_Puesto,
      N_TelefonoFijo: contacto.N_TelefonoFijo,
      N_TelefonoMovil: contacto.N_TelefonoMovil,
      S_Email: contacto.S_Email,
      S_Comentarios: contacto.S_Comentarios
    });
  }

  public eliminarContacto(id: string): void {
    this.corporativoEditService.eliminarContacto(id).subscribe((res) => {
      const index = this.contactos.findIndex((contacto) => contacto.id === id);

      this.contactos.splice(index, 1);
    })
  }
}
