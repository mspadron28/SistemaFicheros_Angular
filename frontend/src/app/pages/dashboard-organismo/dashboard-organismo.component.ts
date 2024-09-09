import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudesDialogComponent } from '../../components/solicitudes-dialog/solicitudes-dialog.component';
import { CrudOrganismoService } from '../../services/crudOrganismo.service';
import { Convocatoria } from '../../models/convocatoria.model';
import { Solicitud } from '../../models/solicitud.model';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CreateConvocatoriaDialogComponent } from '../../components/create-convocatoria-dialog/create-convocatoria-dialog.component';
@Component({
  selector: 'app-dashboard-organismo',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard-organismo.component.html',
  styleUrl: './dashboard-organismo.component.css'
})
export class DashboardOrganismoComponent implements OnInit {
  convocatorias: Convocatoria[] = [];
  organismoId: string = '';
  solicitudesCompletas: Solicitud[] = [];

  constructor(
    private router: Router,
    private crudOrganismoService: CrudOrganismoService,
    private authService: AuthService,
    private solicitudService: CrudSolicitudService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // Obtén el token y el ID del organismo desde el servicio de autenticación
    const { token, id } = this.authService.getTokenAndOrganismoId();

    // Asigna el ID del organismo
    this.organismoId = id;

    if (this.organismoId) {
      // Incluye el token en las solicitudes para autenticación
      this.crudOrganismoService.getConvocatoriasByOrganismo(this.organismoId).subscribe(
        (convocatorias) => {
          console.log('Convocatorias recibidas:', convocatorias);
          // Usa NgZone.run para asegurarte de que las actualizaciones estén dentro de la zona de Angular
          this.ngZone.run(() => {
            this.convocatorias = convocatorias;
          });
        },
        (error) => {
          console.error('Error al obtener convocatorias:', error);
        }
      );
    } else {
      console.error('ID del organismo no disponible: ', id);
    }
  }

  verSolicitudes(convocatoria: Convocatoria): void {
    // Obtén la información completa de las solicitudes utilizando el servicio
    // Reemplaza con la inyección de dependencias real
    const solicitudIds = convocatoria.solicitudes;

    if (solicitudIds && solicitudIds.length > 0) {
      this.solicitudService.getSolicitudesByIds(solicitudIds).subscribe(
        (solicitudes) => {
          // Abre el diálogo de solicitudes y pasa las solicitudes como datos al componente de diálogo
          this.dialog.open(SolicitudesDialogComponent, {
            data: { solicitudes },
            width: '60%',
            height: '500px'
          });
        },
        (error) => {
          console.error('Error al obtener información de la solicitud:', error);
        }
      );
    } else {
      // No hay solicitudes, abre el diálogo con un array vacío
      this.dialog.open(SolicitudesDialogComponent, {
        data: { solicitudes: [] },
        width: '60%',
        height: '500px'
      });
    }
  }

  abrirCuadroDialogoCrearConvocatoria(): void {
    const dialogRef = this.dialog.open(CreateConvocatoriaDialogComponent, {
      width: '60%', // Puedes ajustar el tamaño según tus necesidades
    });



    // Puedes suscribirte al evento afterClosed para realizar acciones después de cerrar el cuadro de diálogo
    dialogRef.afterClosed().subscribe((result) => {
      console.log('El cuadro de diálogo se cerró');

      // Actualiza la lista de convocatorias después de cerrar el cuadro de diálogo
      this.actualizarConvocatorias();
    });

  }

  actualizarConvocatorias(): void {
    if (this.organismoId) {
      this.crudOrganismoService.getConvocatoriasByOrganismo(this.organismoId).subscribe(
        (convocatorias) => {
          console.log('Convocatorias actualizadas:', convocatorias);
          this.ngZone.run(() => {
            this.convocatorias = convocatorias;
          });
        },
        (error) => {
          console.error('Error al obtener convocatorias:', error);
        }
      );
    }
  }


}
