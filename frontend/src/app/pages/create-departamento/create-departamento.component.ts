// create-departamento.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Departamento } from '../../models/departamento.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { CrudDepartamentoService } from '../../services/crudDepartamento.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-create-departamento',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule, NgSelectModule],
  templateUrl: './create-departamento.component.html',
  styleUrls: ['./create-departamento.component.css'],
})
export class CreateDepartamentoComponent implements OnInit {
  formDepartamento: FormGroup;
  investigadores: Investigador[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private crudDepartamentoService: CrudDepartamentoService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInvestigadores();
  }

  initForm(): void {
    this.formDepartamento = this.formBuilder.group({
      nombre_director: ['', Validators.required],
      nombre: ['', Validators.required],
      investigadores: [[]], // Inicializado como un array vacío para el select múltiple
    });
  }

  getInvestigadores(): Investigador[] {
    return this.investigadores;
  }

  loadInvestigadores(): void {
    this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
      this.investigadores = res;
    });
  }

  onSubmit(): void {
    this.crudDepartamentoService.createDepartamento(this.formDepartamento.value).subscribe({
      next: () => {
        this.alertifyService.success('Departamento Creado');
        this.router.navigateByUrl('/showDepartamentos');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}
