// create-investigador.component.ts
import { Component } from '@angular/core';
import { FormInvestigadorComponent } from '../../components/form-investigador/form-investigador.component';
import { Investigador } from '../../models/investigador.model';
import { CrudInvestigadorService } from '../../services/crudInvestigador.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
    selector: 'app-create-investigador',
    standalone: true,
    imports: [FormInvestigadorComponent],
    templateUrl: './create-investigador.component.html',
    styleUrls: ['./create-investigador.component.css'],
})
export class CreateInvestigadorComponent {

    constructor(
        private router: Router,
        private crudInvestigadorService: CrudInvestigadorService,
        private alertifyService: AlertifyService
    ) {}

    onSubmit(investigador: Investigador): void {
        this.crudInvestigadorService.createInvestigador(investigador).subscribe({
            next: () => {
                this.alertifyService.success('Investigador Creado');
                this.router.navigateByUrl('/showInvestigador');
            },
            error: (error) => {
                this.alertifyService.error(error);
            }
        });
    }
}
