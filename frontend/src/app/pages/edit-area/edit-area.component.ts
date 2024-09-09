// edit-area.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Area } from '../../models/area.model';
import { Departamento } from '../../models/departamento.model';
import { CrudDepartamentoService } from '../../services/crudDepartamento.service';
import { CrudAreaService } from '../../services/crudArea.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-area',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.css'],
})
export class EditAreaComponent implements OnInit {
  formArea: FormGroup;
  departamentos: Departamento[] = [];
  area: Area;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudAreaService: CrudAreaService,
    private crudDepartamentoService: CrudDepartamentoService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartamentos();
    this.loadArea();
  }

  initForm(): void {
    this.formArea = this.formBuilder.group({
      nombre: ['', Validators.required],
      departamentos: [[]],
    });
  }

  loadDepartamentos(): void {
    this.crudDepartamentoService.getDepartamentos().subscribe((res: Departamento[]) => {
      this.departamentos = res;
    });
  }

  loadArea(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudAreaService.getArea(id).subscribe((res: Area) => {
      this.area = res;
      this.patchFormValues();
    });
  }

  patchFormValues(): void {
    this.formArea.patchValue({
      nombre: this.area.nombre,
      departamentos: this.area.departamentos,
    });
  }

  getDepartamentos(): Departamento[] {
    return this.departamentos;
  }

  onSubmit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const updatedArea = this.formArea.value;
    this.crudAreaService.updateArea(id, updatedArea).subscribe({
      next: () => {
        this.alertifyService.success('Área Actualizada');
        this.router.navigateByUrl('/showAreas');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}
