import { Component, OnInit } from '@angular/core';
import { GenericFormComponent } from '../../components/form-convocatoria/form-convocatoria.component';
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Convocatoria } from '../../models/convocatoria.model';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-edit-convocatoria',
  standalone: true,
  imports: [GenericFormComponent, CommonModule],
  templateUrl: './edit-convocatoria.component.html',
  styleUrl: './edit-convocatoria.component.css',
})
export class EditConvocatoriaComponent implements OnInit {
  id!: any;
  model: Convocatoria;

  constructor(
    private crudConvocatoriaService: CrudConvocatoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudConvocatoriaService.getConvocatoria(this.id).subscribe((res: Convocatoria) => {
      this.model = {
        _id: res._id,
        programa: res.programa,
        fecha_publicacion: res.fecha_publicacion,
        fecha_limite: res.fecha_limite,
        direccion_web: res.direccion_web,
        numero_BOE_DOGV: res.numero_BOE_DOGV,
        fecha_resolucion: res.fecha_resolucion,
        solicitudes: res.solicitudes,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };
    });
  }

  onSubmit(convocatoria: Convocatoria): void {
    this.crudConvocatoriaService.updateConvocatoria(this.id, convocatoria).subscribe({
      next: () => {
        this.alertifyService.success('Convocatoria Actualizada');
        this.router.navigateByUrl('/showConvocatoria');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }
}
