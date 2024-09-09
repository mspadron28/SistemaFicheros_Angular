import { Component } from '@angular/core';
import { GenericFormComponent } from '../../components/generic-form/generic-form.component';
import { Organismo } from '../../models/organismo.model';
import { CrudOrganismoService } from '../../services/crudOrganismo.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
//import { error } from 'console';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [GenericFormComponent ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})


export class CreateComponent {

  constructor(
    private router: Router,
    private crudOrganismoService: CrudOrganismoService,
    private alertifyService: AlertifyService
  ) {}

  onSubmit(organismo: Organismo): void {
    this.crudOrganismoService.createOrganismo(organismo).subscribe({
      next: () => {
        this.alertifyService.success('Organismo Creado');
        this.router.navigateByUrl('/show');
      },
      error: (error) => {
        this.alertifyService.error(error);
      }
    });
  }
}
