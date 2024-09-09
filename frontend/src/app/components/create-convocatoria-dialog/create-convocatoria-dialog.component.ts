import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertifyService } from '../../services/alertify.service';
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { AuthService } from '../../services/auth.service';
import { CrudOrganismoService } from '../../services/crudOrganismo.service';
@Component({
  selector: 'app-create-convocatoria-dialog',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './create-convocatoria-dialog.component.html',
  styleUrl: './create-convocatoria-dialog.component.css'
})
export class CreateConvocatoriaDialogComponent {

  formConvocatoria: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateConvocatoriaDialogComponent>,
    private formBuilder: FormBuilder,
    private crudConvocatoriaService: CrudConvocatoriaService,
    private crudOrganismoService: CrudOrganismoService,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formConvocatoria = this.formBuilder.group({
      programa: ['', Validators.required],
      fecha_publicacion: [null, Validators.required],
      fecha_limite: [null, Validators.required],
      direccion_web: ['', Validators.required],
      numero_BOE_DOGV: [null, Validators.required],
      fecha_resolucion: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const { id } = this.authService.getTokenAndOrganismoId();  // Obtener el ID del organismo al iniciar el componente
    const convocatoria = this.formConvocatoria.value;
  
    // Lógica para crear la convocatoria
    this.crudConvocatoriaService.createConvocatoria({ ...convocatoria, organismoId: id }).subscribe(
      (convocatoriaCreada) => {
        if (id && convocatoriaCreada?._id) {
          // Actualizar el organismo con la nueva convocatoria creada
          this.crudOrganismoService.getOrganismo(id).subscribe(
            (organismo) => {
              if (organismo) {
                organismo.convocatorias.push(convocatoriaCreada._id);
                this.crudOrganismoService.updateOrganismo(id, organismo).subscribe(
                  () => {
                    this.alertifyService.success('Convocatoria Creada');
                    this.dialogRef.close();
                  },
                  (updateError) => {
                    this.alertifyService.error('Error al actualizar el organismo: ' + updateError);
                  }
                );
              } else {
                this.alertifyService.error('Organismo no encontrado');
              }
            },
            (organismoError) => {
              this.alertifyService.error('Error al obtener el organismo: ' + organismoError);
            }
          );
        } else {
          this.alertifyService.error('Error al obtener el ID de la convocatoria');
        }
      },
      (createError) => {
        this.alertifyService.error('Error al crear la convocatoria: ' + createError);
      }
    );
  }
  

}
