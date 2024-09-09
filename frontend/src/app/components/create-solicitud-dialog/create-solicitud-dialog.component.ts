import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { AlertifyService } from '../../services/alertify.service';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-create-solicitud-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-solicitud-dialog.component.html',
  styleUrl: './create-solicitud-dialog.component.css'
})
export class CreateSolicitudDialogComponent {
  formSolicitud: FormGroup;
  investigadores: Investigador[] = [];
  constructor(
    public dialogRef: MatDialogRef<CreateSolicitudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { convocatoriaId: string },
    private formBuilder: FormBuilder,
    private crudSolicitudService: CrudSolicitudService,
    private crudInvestigadorService: CrudInvestigadorService,
    private crudConvocatoriaService: CrudConvocatoriaService,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadInvestigadores();
  }

  getNoResponsableInvestigadores(): Investigador[] {
    return this.investigadores.filter((investigador) => !investigador.responsable);
  }

  loadInvestigadores(): void {
    this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
      this.investigadores = res;
    });
  }

  initForm(): void {
    this.formSolicitud = this.formBuilder.group({

      titulo_proyecto: ['', Validators.required],
      fecha_presentacion: [null, Validators.required],
      fecha_resolucion: [null, Validators.required],
      importe_economico: [null, Validators.required],
      fecha_inicioProyecto: [null, Validators.required],
      fecha_finProyecto: [null, Validators.required],
      participantes: [this.authService.getTokenAndInvestigadorId().id],
      estado: [false],  // El estado por defecto es falso
      convocatoriaId: [this.data.convocatoriaId, Validators.required]
    });
  }

  onSubmit(): void {

    const { id } = this.authService.getTokenAndInvestigadorId(); 
    const { convocatoriaId, participantes, ...solicitud } = this.formSolicitud.value;


    // Aseguramos que el ID del investigador responsable esté en la lista de participantes
    const participantesData = Array.from(new Set([...participantes, id])).map(investigadorId => ({ _id: investigadorId }));

    solicitud.participantes = participantesData;

    this.crudSolicitudService.createSolicitud(solicitud).subscribe({
      next: (solicitudCreada) => {
        if (convocatoriaId && solicitudCreada?._id) {
          // Actualizar la convocatoria con la nueva solicitud creada
          this.crudConvocatoriaService.getConvocatoria(convocatoriaId).subscribe({
            next: (convocatoria) => {
              if (convocatoria) {
                convocatoria.solicitudes.push(solicitudCreada._id);

                this.crudConvocatoriaService.updateConvocatoria(convocatoriaId, convocatoria).subscribe({
                  next: () => {
                    this.alertifyService.success('Solicitud Creada');
                    this.dialogRef.close();
                  },
                  error: (updateError) => {
                    this.alertifyService.error('Error al actualizar la convocatoria: ' + updateError);
                  },
                });
              } else {
                this.alertifyService.error('Convocatoria no encontrada');
              }
            },
            error: (convocatoriaError) => {
              this.alertifyService.error('Error al obtener la convocatoria: ' + convocatoriaError);
            },
          });
        } else {
          this.alertifyService.error('Error al obtener el ID de la solicitud');
        }
      },
      error: (createError) => {
        this.alertifyService.error('Error al crear la solicitud: ' + createError);
      },
    });
  }

}
