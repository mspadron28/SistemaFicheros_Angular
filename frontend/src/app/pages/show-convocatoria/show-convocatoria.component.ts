import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// IMPORTS DE LOS MODELOS
import { Convocatoria } from '../../models/convocatoria.model';
import { Solicitud } from '../../models/solicitud.model';
// IMPORTS DE LOS CRUDS
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';

import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-show-convocatoria',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './show-convocatoria.component.html',
  styleUrl: './show-convocatoria.component.css',
})
export class ShowConvocatoriaComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faPen = faPen;
  faTrash = faTrash;
  convocatorias: Convocatoria[] = [];
  solicitudes: Solicitud[] = [];


  constructor(
    private crudConvocatoriaService: CrudConvocatoriaService,
    private crudSolicitudService: CrudSolicitudService,
    private alertifyService: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.crudConvocatoriaService.getConvocatorias().subscribe((res: Convocatoria[]) => {
      this.convocatorias = res;
      
      this.crudSolicitudService.getSolicitudes().subscribe((solicitudesRes: Solicitud[]) => {
        this.solicitudes = solicitudesRes;
      });
    });
  }


   // Para obtener las solicitudes correspondientes por convocatoria
   getSolicitudById(solicitudId: string): Solicitud | undefined  {
    return this.solicitudes.find(solicitud => solicitud._id === solicitudId);
  }

  delete(id: any, index: any): void {
    this.alertifyService.confirm({
      message: '¿Estás seguro que quieres eliminar la convocatoria?',
      callback_delete: () => {
        this.crudConvocatoriaService.deleteConvocatoria(id).subscribe(() => {
          this.convocatorias.splice(index, 1);
        });
      },
    });
  }
}
