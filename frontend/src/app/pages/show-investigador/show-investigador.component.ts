// show-investigador.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { faCirclePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
    selector: 'app-show-investigador',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
    templateUrl: './show-investigador.component.html',
    styleUrls: ['./show-investigador.component.css'],
})
export class ShowInvestigadorComponent implements OnInit {
    faCirclePlus = faCirclePlus;
    faPen = faPen;
    faTrash = faTrash;
    investigadores: Investigador[] = [];

    constructor(
        private crudInvestigadorService: CrudInvestigadorService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit(): void {
        this.crudInvestigadorService
            .getInvestigadores()
            .subscribe((res: Investigador[]) => {
                this.investigadores = res;
            });
    }

    delete(id: any, index: any): void {
        this.alertifyService.confirm({
            message: '¿Estás seguro que quieres eliminar el investigador?',
            callback_delete: () => {
                this.crudInvestigadorService
                    .deleteInvestigador(id)
                    .subscribe(() => {
                        this.investigadores.splice(index, 1);
                    });
            },
        });
    }
}
