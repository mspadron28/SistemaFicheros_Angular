// form-investigador.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Investigador } from '../../models/investigador.model';

@Component({
  selector: 'form-investigador',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './form-investigador.component.html',
  styleUrls: ['./form-investigador.component.css']
})
export class FormInvestigadorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  formInvestigador: FormGroup;

  @Input()
  modelInvestigador: Investigador;

  @Output()
  submitValues: EventEmitter<Investigador> = new EventEmitter<Investigador>();
  ngOnInit(): void {
    this.formInvestigador = this.formBuilder.group({
      nombre: ['', Validators.required],
      responsable: [false, Validators.required],
      password: [{ value: '', disabled: true }] // Inicialmente deshabilitado y con valor vacío
    });

    if (this.modelInvestigador !== undefined) {
      this.formInvestigador.patchValue(this.modelInvestigador);
    }

    // Observar cambios en el checkbox "responsable"
    this.formInvestigador.get('responsable').valueChanges.subscribe((value: boolean) => {
      // Limpiar y deshabilitar el campo de contraseña si no es responsable
      if (!value) {
        this.formInvestigador.get('password').disable();
      } else {
        // Habilitar el campo de contraseña si es responsable
        this.formInvestigador.get('password').enable();
      }
    });
  }



  onSubmit(): void {
    let formData = this.formInvestigador.value;
    if (!formData.responsable && !formData.password) {
      formData.password = 'default';
    }
    this.submitValues.emit(formData);
  }
}
