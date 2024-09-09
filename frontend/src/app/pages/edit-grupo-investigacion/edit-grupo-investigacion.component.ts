// edit-grupo-investigacion.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GrupoInvestigacion } from '../../models/grupo-investigacion.model';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { CrudGrupoInvestigacionService } from '../../services/crudGrupoInvestigacion.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-grupo-investigacion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './edit-grupo-investigacion.component.html',
  styleUrls: ['./edit-grupo-investigacion.component.css'],
})
export class EditGrupoInvestigacionComponent implements OnInit {
  formGrupoInvestigacion: FormGroup;
  investigadores: Investigador[] = [];
  grupoInvestigacion: GrupoInvestigacion;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudGrupoInvestigacionService: CrudGrupoInvestigacionService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInvestigadores();
    this.loadGrupoInvestigacion();
  }

  initForm(): void {
    this.formGrupoInvestigacion = this.formBuilder.group({
      investigador_responsable_id: ['', Validators.required],
      nombre: ['', Validators.required],
      participantes: [[]],
    });
  }

  loadInvestigadores(): void {
    this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
      this.investigadores = res;
    });
  }

  loadGrupoInvestigacion(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudGrupoInvestigacionService.getGrupoInvestigacion(id).subscribe((res: GrupoInvestigacion) => {
      this.grupoInvestigacion = res;
      this.patchFormValues();
    });
  }

  patchFormValues(): void {
    this.formGrupoInvestigacion.patchValue({
      investigador_responsable_id: this.grupoInvestigacion.investigador_responsable_id,
      nombre: this.grupoInvestigacion.nombre,
      participantes: this.grupoInvestigacion.participantes,
    });
  }

  getResponsableInvestigadores(): Investigador[] {
    return this.investigadores.filter((investigador) => investigador.responsable);
  }

  getNoResponsableInvestigadores(): Investigador[] {
    return this.investigadores.filter((investigador) => !investigador.responsable);
  }

  onSubmit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const updatedGrupoInvestigacion = this.formGrupoInvestigacion.value;
    this.crudGrupoInvestigacionService.updateGrupoInvestigacion(id, updatedGrupoInvestigacion).subscribe({
      next: () => {
        this.alertifyService.success('Grupo Investigación Actualizado');
        this.router.navigateByUrl('/showGruposInvestigacion');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}

