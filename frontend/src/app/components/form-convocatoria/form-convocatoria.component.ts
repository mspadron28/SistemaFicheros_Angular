// generic-form.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Convocatoria } from '../../models/convocatoria.model';

@Component({
  selector: 'form-convocatoria',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './form-convocatoria.component.html',
  styleUrl: './form-convocatoria.component.css'
})
export class GenericFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  formConvocatoria: FormGroup;
  @Input()
  modelConvocatoria: Convocatoria;

  @Output()
  submitValues: EventEmitter<Convocatoria> = new EventEmitter<Convocatoria>();

  ngOnInit(): void {
    this.formConvocatoria = this.formBuilder.group({
      programa: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      fecha_limite: ['', Validators.required],
      direccion_web: ['', Validators.required],
      numero_BOE_DOGV: ['', Validators.required],
      fecha_resolucion: ['', Validators.required]
    });

    if (this.modelConvocatoria !== undefined) {
      this.formConvocatoria.patchValue(this.modelConvocatoria);
    }
  }

  onSubmit(): void {
    this.submitValues.emit(this.formConvocatoria.value);
  }
}

