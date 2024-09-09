import { Component, OnInit } from '@angular/core';
import { GenericFormComponent  } from '../../components/generic-form/generic-form.component';
import { CrudOrganismoService } from '../../services/crudOrganismo.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Organismo } from '../../models/organismo.model';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../services/alertify.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [GenericFormComponent,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  id!:any;
  model: Organismo;
  constructor(
    private crudOrganismoService: CrudOrganismoService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private alertifyService:AlertifyService
  ){

  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudOrganismoService.getOrganismo(this.id).subscribe((res: Organismo) => {
      this.model = {
        _id: res._id,
        nombre: res.nombre,
        direccion: res.direccion,
        poblacion: res.poblacion,
        codigo_postal: res.codigo_postal,
        telefono: res.telefono,
        convocatorias: res.convocatorias,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };
    });
  }

  onSubmit(organismo: Organismo): void {
    this.crudOrganismoService.updateOrganismo(this.id, organismo).subscribe({
      next: () => {
        this.alertifyService.success('Organismo Actualizado');
        this.router.navigateByUrl('/show');
      },
      error: (error) => {
        this.alertifyService.error(error);
      },
    });
  }


}
