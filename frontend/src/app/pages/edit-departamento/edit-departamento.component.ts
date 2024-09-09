// edit-departamento.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Departamento } from '../../models/departamento.model';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { CrudDepartamentoService } from '../../services/crudDepartamento.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-departamento',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.css'],
})
export class EditDepartamentoComponent implements OnInit {
  formDepartamento: FormGroup;
  investigadores: Investigador[] = [];
  departamento: Departamento;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudDepartamentoService: CrudDepartamentoService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInvestigadores();
    this.loadDepartamento();
  }

  initForm(): void {
    this.formDepartamento = this.formBuilder.group({
      nombre_director: ['', Validators.required],
      nombre: ['', Validators.required],
      investigadores: [[]],
    });
  }

  loadInvestigadores(): void {
    this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
      this.investigadores = res;
    });
  }

  loadDepartamento(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudDepartamentoService.getDepartamento(id).subscribe((res: Departamento) => {
      this.departamento = res;
      this.patchFormValues();
    });
  }

  patchFormValues(): void {
    this.formDepartamento.patchValue({
      nombre_director: this.departamento.nombre_director,
      nombre: this.departamento.nombre,
      investigadores: this.departamento.investigadores,
    });
  }

  getInvestigadores(): Investigador[] {
    return this.investigadores;
  }

  onSubmit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const updatedDepartamento = this.formDepartamento.value;
    this.crudDepartamentoService.updateDepartamento(id, updatedDepartamento).subscribe({
      next: () => {
        this.alertifyService.success('Departamento Actualizado');
        this.router.navigateByUrl('/showDepartamentos');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}
