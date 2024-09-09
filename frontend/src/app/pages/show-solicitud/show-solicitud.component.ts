// show-solicitud.component.ts
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
// IMPORTS DE LOS MODELOS
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
// IMPORTS DE LOS CRUDS
import { Solicitud } from '../../models/solicitud.model';
import { Investigador } from '../../models/investigador.model';
import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-show-solicitud',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './show-solicitud.component.html',
  styleUrls: ['./show-solicitud.component.css'],
})
export class ShowSolicitudComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faPen = faPen;
  faTrash = faTrash;
  solicitudes: Solicitud[] = [];
  investigadores: Investigador[] = [];

  constructor(
    private crudSolicitudService: CrudSolicitudService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.crudSolicitudService.getSolicitudes().subscribe((res: Solicitud[]) => {
      this.solicitudes = res;

      this.crudInvestigadorService.getInvestigadores().subscribe((investigadoresRes: Investigador[]) => {
        this.investigadores = investigadoresRes;
      });
    });
  }

  getInvestigadorById(investigadorId: string): Investigador | undefined {
    return this.investigadores.find((investigador) => investigador._id === investigadorId);
  }

  delete(id: any, index: any): void {
    this.alertifyService.confirm({
      message: '¿Estás seguro que quieres eliminar la solicitud?',
      callback_delete: () => {
        this.crudSolicitudService.deleteSolicitud(id).subscribe(() => {
          this.solicitudes.splice(index, 1);
        });
      },
    });
  }
}
