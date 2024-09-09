// create-area.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Departamento } from '../../models/departamento.model';
import { CrudDepartamentoService } from '../../services/crudDepartamento.service';
import { CrudAreaService } from '../../services/crudArea.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-create-area',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule, NgSelectModule],
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.css'],
})
export class CreateAreaComponent implements OnInit {
  formArea: FormGroup;
  departamentos: Departamento[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private crudAreaService: CrudAreaService,
    private crudDepartamentoService: CrudDepartamentoService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartamentos();
  }

  initForm(): void {
    this.formArea = this.formBuilder.group({
      nombre: ['', Validators.required],
      departamentos: [[]], // Inicializado como un array vacío para el select múltiple
    });
  }

  getDepartamentos(): Departamento[] {
    return this.departamentos;
  }

  loadDepartamentos(): void {
    this.crudDepartamentoService.getDepartamentos().subscribe((res: Departamento[]) => {
      this.departamentos = res;
    });
  }

  onSubmit(): void {
    this.crudAreaService.createArea(this.formArea.value).subscribe({
      next: () => {
        this.alertifyService.success('Área Creada');
        this.router.navigateByUrl('/showAreas');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}
