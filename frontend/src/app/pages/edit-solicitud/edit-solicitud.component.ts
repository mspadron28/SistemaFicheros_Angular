import { Component, OnInit } from '@angular/core';
import { GenericFormSolicitudComponent } from '../../components/form-solicitud/form-solicitud.component';
import { CrudSolicitudService } from '../../services/crudSolicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-edit-solicitud',
  standalone: true,
  imports: [GenericFormSolicitudComponent, CommonModule],
  templateUrl: './edit-solicitud.component.html',
  styleUrl: './edit-solicitud.component.css',
})
export class EditSolicitudComponent implements OnInit {
  id!: any;
  model: Solicitud;

  constructor(
    private crudSolicitudService: CrudSolicitudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudSolicitudService.getSolicitud(this.id).subscribe((res: Solicitud) => {
      this.model = {
        _id: res._id,
        titulo_proyecto: res.titulo_proyecto,
        fecha_presentacion: res.fecha_presentacion,
        fecha_resolucion: res.fecha_resolucion,
        importe_economico: res.importe_economico,
        fecha_inicioProyecto: res.fecha_inicioProyecto,
        fecha_finProyecto: res.fecha_finProyecto,
        estado: res.estado,
        participantes: res.participantes,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };
    });
  }

  onSubmit(solicitud: Solicitud): void {
    this.crudSolicitudService.updateSolicitud(this.id, solicitud).subscribe({
      next: () => {
        this.alertifyService.success('Solicitud Actualizada');
        this.router.navigateByUrl('/showSolicitud');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}
