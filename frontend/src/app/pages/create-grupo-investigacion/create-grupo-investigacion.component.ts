// create-grupo-investigacion.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { CrudGrupoInvestigacionService } from '../../services/crudGrupoInvestigacion.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-create-grupo-investigacion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule,NgSelectModule],
  templateUrl: './create-grupo-investigacion.component.html',
  styleUrls: ['./create-grupo-investigacion.component.css'],
})
export class CreateGrupoInvestigacionComponent implements OnInit {
  formGrupoInvestigacion: FormGroup;
  investigadores: Investigador[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private crudGrupoInvestigacionService: CrudGrupoInvestigacionService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadInvestigadores();
  }

  initForm(): void {
    this.formGrupoInvestigacion = this.formBuilder.group({
      investigador_responsable_id: ['', Validators.required],
      nombre: ['', Validators.required],
      participantes: [[]], // Inicializado como un array vacío para el select múltiple
    });
  }

  getResponsableInvestigadores(): Investigador[] {
    return this.investigadores.filter(investigador => investigador.responsable);
  }
  getNoResponsableInvestigadores(): Investigador[] {
    return this.investigadores.filter(investigador => !investigador.responsable);
  }
  loadInvestigadores(): void {
    this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
      this.investigadores = res;
    });
  }

  onSubmit(): void {
    this.crudGrupoInvestigacionService.createGrupoInvestigacion(this.formGrupoInvestigacion.value).subscribe({
      next: () => {
        this.alertifyService.success('Grupo Investigación Creado');
        this.router.navigateByUrl('/showGruposInvestigacion');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}