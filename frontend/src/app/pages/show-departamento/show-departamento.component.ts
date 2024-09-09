// show-departamento.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// IMPORTS DE LOS MODELOS
import { Departamento } from '../../models/departamento.model';
import { Investigador } from '../../models/investigador.model';
// IMPORTS DE LOS CRUDS
import { CrudDepartamentoService } from '../../services/crudDepartamento.service';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-show-departamento',
  standalone: true,
  templateUrl: './show-departamento.component.html',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  styleUrl: './show-departamento.component.css',
})
export class ShowDepartamentoComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faPen = faPen;
  faTrash = faTrash;
  departamentos: Departamento[] = [];
  investigadores: Investigador[] = [];

  constructor(
    private crudDepartamentoService: CrudDepartamentoService,
    private crudInvestigadorService: CrudInvestigadorService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.crudDepartamentoService.getDepartamentos().subscribe((res: Departamento[]) => {
      this.departamentos = res;

      this.crudInvestigadorService.getInvestigadores().subscribe((res: Investigador[]) => {
        this.investigadores = res;
      });
    });
  }

  getInvestigadorById(investigadorId: string): Investigador | undefined {
    return this.investigadores.find((investigador) => investigador._id === investigadorId);
  }

  delete(id: any, index: any): void {
    this.alertifyService.confirm({
      message: '¿Estás seguro que quieres eliminar el departamento?',
      callback_delete: () => {
        this.crudDepartamentoService.deleteDepartamento(id).subscribe(() => {
          this.departamentos.splice(index, 1);
        });
      },
    });
  }
}
