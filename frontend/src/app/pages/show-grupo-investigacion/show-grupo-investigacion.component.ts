// show-grupo-investigacion.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// IMPORTS DE LOS MODELOS
import { GrupoInvestigacion } from '../../models/grupo-investigacion.model';
import { Investigador } from '../../models/investigador.model'; // Asumo que tienes un modelo de Investigador
// IMPORTS DE LOS CRUDS
import { CrudGrupoInvestigacionService } from '../../services/crudGrupoInvestigacion.service';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-show-grupo-investigacion',
  standalone: true,
  templateUrl: './show-grupo-investigacion.component.html',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  styleUrl: './show-grupo-investigacion.component.css',
})
export class ShowGrupoInvestigacionComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faPen = faPen;
  faTrash = faTrash;
  gruposInvestigacion: GrupoInvestigacion[] = [];
  investigadores: Investigador[] = [];

  constructor(
    private crudGrupoInvestigacionService: CrudGrupoInvestigacionService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.crudGrupoInvestigacionService.getGruposInvestigacion().subscribe((res: GrupoInvestigacion[]) => {
      this.gruposInvestigacion = res;

      this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
        this.investigadores = res;
      });
    });

    
    
  }

  // Para obtener investigadores correspondientes por grupo de investigación
  getInvestigadorById(investigadorId: string): Investigador | undefined {
    return this.investigadores.find((investigador) => investigador._id === investigadorId);
  }

  delete(id: any, index: any): void {
    this.alertifyService.confirm({
      message: '¿Estás seguro que quieres eliminar el grupo de investigación?',
      callback_delete: () => {
        this.crudGrupoInvestigacionService.deleteGrupoInvestigacion(id).subscribe(() => {
          this.gruposInvestigacion.splice(index, 1);
        });
      },
    });
  }
}
