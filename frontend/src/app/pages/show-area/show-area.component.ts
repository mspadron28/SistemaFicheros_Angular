// show-area.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// IMPORTS DE LOS MODELOS
import { Area } from '../../models/area.model';
import { Departamento } from '../../models/departamento.model';
// IMPORTS DE LOS CRUDS
import { CrudAreaService } from '../../services/crudArea.service';
import { CrudDepartamentoService } from '../../services/crudDepartamento.service';
import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-show-area',
  standalone: true,
  templateUrl: './show-area.component.html',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  styleUrl: './show-area.component.css',
})
export class ShowAreaComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faPen = faPen;
  faTrash = faTrash;
  areas: Area[] = [];
  departamentos: Departamento[] = [];

  constructor(
    private crudAreaService: CrudAreaService,
    private crudDepartamentoService: CrudDepartamentoService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.crudAreaService.getAreas().subscribe((res: Area[]) => {
      this.areas = res;

      this.crudDepartamentoService.getDepartamentos().subscribe((res: Departamento[]) => {
        this.departamentos = res;
      });
    });
  }

  getDepartamentoById(departamentoId: string): Departamento | undefined {
    return this.departamentos.find((departamento) => departamento._id === departamentoId);
  }

  delete(id: any, index: any): void {
    this.alertifyService.confirm({
      message: '¿Estás seguro que quieres eliminar el área?',
      callback_delete: () => {
        this.crudAreaService.deleteArea(id).subscribe(() => {
          this.areas.splice(index, 1);
        });
      },
    });
  }
}
