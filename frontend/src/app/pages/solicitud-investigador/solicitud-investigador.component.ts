import { Component,OnInit, NgZone} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SolicitudesDialogComponent } from '../../components/solicitudes-dialog/solicitudes-dialog.component';
import { Solicitud } from '../../models/solicitud.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-solicitud-investigador',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive,],
  templateUrl: './solicitud-investigador.component.html',
  styleUrl: './solicitud-investigador.component.css'
})
export class SolicitudInvestigadorComponent {
  solicitudesCompletas: Solicitud[] = [];

  constructor(
    private authService: AuthService,
    private solicitudService: CrudSolicitudService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  
  ngOnInit(): void {
    // Obtén el token y el ID del investigador desde el servicio de autenticación
    const { token, id } = this.authService.getTokenAndInvestigadorId();

    // Asigna el ID del investigador
    const investigadorId = id;

    if (investigadorId) {
      // Obtén las solicitudes del investigador
      this.solicitudService.getSolicitudesByInvestigadorId(investigadorId).subscribe(
        (solicitudes) => {
          console.log('Solicitudes recibidas:', solicitudes);
          // Usa NgZone.run para asegurarte de que las actualizaciones estén dentro de la zona de Angular
          this.ngZone.run(() => {
            this.solicitudesCompletas = solicitudes;
          });
        },
        (error) => {
          console.error('Error al obtener solicitudes:', error);
        }
      );
    } else {
      console.error('ID del investigador no disponible: ', id);
    }
  }
}
