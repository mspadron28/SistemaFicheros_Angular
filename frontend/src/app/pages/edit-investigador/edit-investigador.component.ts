// edit-investigador.component.ts
import { Component, OnInit } from '@angular/core';
import { FormInvestigadorComponent } from '../../components/form-investigador/form-investigador.component';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Investigador } from '../../models/investigador.model';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../services/alertify.service';

@Component({
    selector: 'app-edit-investigador',
    standalone: true,
    imports: [FormInvestigadorComponent, CommonModule],
    templateUrl: './edit-investigador.component.html',
    styleUrls: ['./edit-investigador.component.css'],
})
export class EditInvestigadorComponent implements OnInit {
    id!: any;
    model: Investigador;

    constructor(
        private crudInvestigadorService: CrudInvestigadorService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.crudInvestigadorService.getInvestigador(this.id).subscribe((res: Investigador) => {
            this.model = {
                _id: res._id,
                nombre: res.nombre,
                responsable: res.responsable,
                createdAt: res.createdAt,
                updatedAt: res.updatedAt,
            };
        });
    }

    onSubmit(investigador: Investigador): void {
        this.crudInvestigadorService.updateInvestigador(this.id, investigador).subscribe({
            next: () => {
                this.alertifyService.success('Investigador Actualizado');
                this.router.navigateByUrl('/showInvestigador');
            },
            error: (error) => {
                this.alertifyService.error(error);
            },
        });
    }
}
