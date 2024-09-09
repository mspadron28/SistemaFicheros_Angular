// form-solicitud.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Solicitud } from '../../models/solicitud.model';

@Component({
  selector: 'form-solicitud',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css']
})
export class GenericFormSolicitudComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  formSolicitud: FormGroup;
  @Input()
  modelSolicitud: Solicitud;

  @Output()
  submitValues: EventEmitter<Solicitud> = new EventEmitter<Solicitud>();

  ngOnInit(): void {
    this.formSolicitud = this.formBuilder.group({
      titulo_proyecto: ['', Validators.required],
      fecha_presentacion: ['', Validators.required],
      fecha_resolucion: ['', Validators.required],
      importe_economico: ['', Validators.required],
      fecha_inicioProyecto: ['', Validators.required],
      fecha_finProyecto: ['', Validators.required],
      estado: [false]
    });

    if (this.modelSolicitud !== undefined) {
      this.formSolicitud.patchValue(this.modelSolicitud);
    }
  }

  onSubmit(): void {
    this.submitValues.emit(this.formSolicitud.value);
  }
}
