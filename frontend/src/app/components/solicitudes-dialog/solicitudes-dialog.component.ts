import { Component,Inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
@Component({
  selector: 'app-solicitudes-dialog',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,MatButtonModule, MatDialogModule,MatSlideToggleModule ],
  templateUrl: './solicitudes-dialog.component.html',
  styleUrl: './solicitudes-dialog.component.css'
})
export class SolicitudesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SolicitudesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService: CrudSolicitudService
  ) {
    console.log('Datos recibidos:', data);
  }

  
  cerrarDialogo(): void {
    this.dialogRef.close();
  }

  haySolicitudes(): boolean {
    return this.data && this.data.solicitudes && this.data.solicitudes.length > 0;
  }

  toggleEstado(solicitud: any): void {
    // Implementa la lógica para cambiar el estado de la solicitud (aceptar/rechazar)
    solicitud.estado = !solicitud.estado;

    // Envia el cambio al servidor
    this.solicitudService.updateSolicitud(solicitud._id, { estado: solicitud.estado })
      .subscribe(
        (updatedSolicitud) => {
          console.log('Estado de la solicitud actualizado:', updatedSolicitud);
        },
        (error) => {
          console.error('Error al actualizar el estado de la solicitud:', error);
          // Revertir el cambio en caso de error (opcional)
          solicitud.estado = !solicitud.estado;
        }
      );
  }
}
