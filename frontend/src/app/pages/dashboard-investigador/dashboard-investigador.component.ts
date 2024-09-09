import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { CrudOrganismoService } from '../../services/crudOrganismo.service';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { Convocatoria } from '../../models/convocatoria.model';
import { Solicitud } from '../../models/solicitud.model';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CreateSolicitudDialogComponent } from '../../components/create-solicitud-dialog/create-solicitud-dialog.component';


@Component({
  selector: 'app-dashboard-investigador',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './dashboard-investigador.component.html',
  styleUrl: './dashboard-investigador.component.css'
})
export class DashboardInvestigadorComponent implements OnInit {
  convocatorias: Convocatoria[] = [];

  constructor(
    private router: Router,
    private crudOrganismoService: CrudOrganismoService,
    private crudConvocatoriaService: CrudConvocatoriaService,
    private authService: AuthService,
    private solicitudService: CrudSolicitudService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    // Incluye el token en las solicitudes para autenticación
    this.crudConvocatoriaService.getConvocatorias().subscribe(
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

    

  }

  realizarSolicitud(convocatoria: Convocatoria): void {
    const dialogRef = this.dialog.open(CreateSolicitudDialogComponent, {
      width: '40%', // Ajusta el tamaño según tus necesidades
      data: { convocatoriaId: convocatoria._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El cuadro de diálogo de solicitud se cerró', result);
      // Puedes realizar acciones después de cerrar el cuadro de diálogo si es necesario
    });

  }
}
