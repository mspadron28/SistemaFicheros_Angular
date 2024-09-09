// generic-form.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Organismo } from '../../models/organismo.model';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  formOrganismo: FormGroup;
  @Input()
  modelOrganismo: Organismo;

  @Output()
  submitValues: EventEmitter<Organismo> = new EventEmitter<Organismo>();

  ngOnInit(): void {
    this.formOrganismo = this.formBuilder.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      direccion: ['', Validators.required],
      poblacion: ['', Validators.required],
      codigo_postal: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    if (this.modelOrganismo !== undefined) {
      this.formOrganismo.patchValue(this.modelOrganismo);
    }
  }

  onSubmit(): void {
    this.submitValues.emit(this.formOrganismo.value);
  }

}
