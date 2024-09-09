// create-convocatoria.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { CrudOrganismoService } from '../../services/crudOrganismo.service';
import { Organismo } from '../../models/organismo.model';


@Component({
  selector: 'app-create-convocatoria',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './create-convocatoria.component.html',
  styleUrls: ['./create-convocatoria.component.css'],
})
export class CreateConvocatoriaComponent implements OnInit {
  formConvocatoria: FormGroup;
  organismos: Organismo[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private crudConvocatoriaService: CrudConvocatoriaService,
    private crudOrganismoService: CrudOrganismoService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadOrganismos();
  }

  initForm(): void {
    this.formConvocatoria = this.formBuilder.group({
      programa: ['', Validators.required],
      fecha_publicacion: [null, Validators.required],
      fecha_limite: [null, Validators.required],
      direccion_web: ['', Validators.required],
      numero_BOE_DOGV: [null, Validators.required],
      fecha_resolucion: [null, Validators.required],
      organismoId: [null, Validators.required],
    });
  }

  loadOrganismos(): void {
    this.crudOrganismoService.getOrganismos().subscribe(
      (res: Organismo[]) => {
        this.organismos = res;
      },
      (error) => {
        this.alertifyService.error('Error al cargar los organismos');
      }
    );
  }

  onSubmit(): void {
    const { organismoId, ...convocatoria } = this.formConvocatoria.value;
  
    this.crudConvocatoriaService.createConvocatoria(convocatoria).subscribe({
      next: (convocatoriaCreada) => {
        if (organismoId && convocatoriaCreada?._id) {
          const organismo: Organismo | undefined = this.organismos.find((o) => o._id === organismoId);
  
          if (organismo) {
            organismo.convocatorias.push(convocatoriaCreada._id);
  
            this.crudOrganismoService.updateOrganismo(organismoId, organismo).subscribe({
              next: () => {
                this.alertifyService.success('Convocatoria Creada');
                this.router.navigateByUrl('/showConvocatoria');
              },
              error: (updateError) => {
                this.alertifyService.error('Error al actualizar el organismo: ' + updateError);
              }
            });
          } else {
            this.alertifyService.error('Organismo no encontrado');
          }
        } else {
          this.alertifyService.error('Error al obtener el ID de la convocatoria');
        }
      },
      error: (createError) => {
        this.alertifyService.error('Error al crear la convocatoria: ' + createError);
      }
    });
  }
  
}