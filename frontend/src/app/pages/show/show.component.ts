import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// IMPORTS DE LOS MODELOS
import { Convocatoria } from '../../models/convocatoria.model';
import { Organismo } from '../../models/organismo.model';

// IMPORTS DE LOS CRUDS
import { CrudOrganismoService } from '../../services/crudOrganismo.service';
import { CrudConvocatoriaService } from '../../services/crudConvocatoria.service';
import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faPen = faPen;
  faTrash = faTrash;
  organismos: Organismo[] = [];
  convocatorias: Convocatoria[] = [];

  constructor(
    private crudOrganismoService: CrudOrganismoService,
    private alertifyService: AlertifyService,
    private crudConvocatoriaService: CrudConvocatoriaService,
  ) { }

  ngOnInit(): void {
    this.crudOrganismoService.getOrganismos().subscribe((res: Organismo[]) => {
      this.organismos = res;
      // Obtengo convocatorias
      this.crudConvocatoriaService.getConvocatorias().subscribe((convocatoriasRes: Convocatoria[]) => {
        this.convocatorias = convocatoriasRes;
      });

    });
  }
 // Para obtener las convocatorias correspondientes por organismo
  getConvocatoriaById(convocatoriaId: string): Convocatoria | undefined {
    return this.convocatorias.find(convocatoria => convocatoria._id === convocatoriaId);
  }



  delete(id: any, index: any): void {
    this.alertifyService.confirm({
      message: '¿Estás seguro que quieres eliminar el organismo?',
      callback_delete: () => {
        this.crudOrganismoService.deleteOrganismo(id).subscribe(() => {
          this.organismos.splice(index, 1);
        });
      },
    });
  }

 

}
