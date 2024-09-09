import { Routes } from '@angular/router';
//RUTAS PARA EL ORGANISMO
import { ShowComponent } from './pages/show/show.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
//RUTAS PARA LA CONVOCATORIA
import { ShowConvocatoriaComponent } from './pages/show-convocatoria/show-convocatoria.component';
import { CreateConvocatoriaComponent } from './pages/create-convocatoria/create-convocatoria.component';
import { EditConvocatoriaComponent } from './pages/edit-convocatoria/edit-convocatoria.component';
//RUTAS PARA LA SOLICITUD
import { ShowSolicitudComponent } from './pages/show-solicitud/show-solicitud.component';
import { CreateSolicitudComponent } from './pages/create-solicitud/create-solicitud.component';
import { EditSolicitudComponent } from './pages/edit-solicitud/edit-solicitud.component';
//RUTAS PARA EL INVESTIGADOR
import { ShowInvestigadorComponent } from './pages/show-investigador/show-investigador.component';
import { CreateInvestigadorComponent } from './pages/create-investigador/create-investigador.component';
import { EditInvestigadorComponent } from './pages/edit-investigador/edit-investigador.component';

//RUTAS PARA GRUPO INVESTIGACION
import { ShowGrupoInvestigacionComponent } from './pages/show-grupo-investigacion/show-grupo-investigacion.component';
import { CreateGrupoInvestigacionComponent } from './pages/create-grupo-investigacion/create-grupo-investigacion.component';
import { EditGrupoInvestigacionComponent } from './pages/edit-grupo-investigacion/edit-grupo-investigacion.component';

//RUTAS PARA DEPARTAMENTO
import { ShowDepartamentoComponent } from './pages/show-departamento/show-departamento.component';
import { CreateDepartamentoComponent } from './pages/create-departamento/create-departamento.component';
import { EditDepartamentoComponent } from './pages/edit-departamento/edit-departamento.component';

//RUTAS PARA AREA
import { ShowAreaComponent } from './pages/show-area/show-area.component';
import { CreateAreaComponent } from './pages/create-area/create-area.component';
import { EditAreaComponent } from './pages/edit-area/edit-area.component';

//RUTA PRINCIPAL
import { PrincipalComponent } from './pages/principal/principal.component';
//RUTA LOGIN 
import { LoginComponent } from './pages/login/login.component';
//RUTA PARA DASHBOARD ORGANISMOS
import { DashboardOrganismoComponent } from './pages/dashboard-organismo/dashboard-organismo.component';
//RUTA PARA DASHBOARD INVESTIGADORES
import { DashboardInvestigadorComponent } from './pages/dashboard-investigador/dashboard-investigador.component';
//SOLICITUD INVESTIGADOR
import { SolicitudInvestigadorComponent } from './pages/solicitud-investigador/solicitud-investigador.component';
export const routes: Routes = [
    //Login
    { path: '', component: LoginComponent },
    //Regreso al main
    { path: 'principal', component: PrincipalComponent },
    //CRUD ORGANISMO
    { path: 'show', component: ShowComponent },
    { path: 'create', component: CreateComponent },
    { path: 'update/:id', component: EditComponent },

    //CRUD CONVOCATORIA
    { path: 'showConvocatoria', component: ShowConvocatoriaComponent },
    { path: 'createConvocatoria', component: CreateConvocatoriaComponent },
    { path: 'updateConvocatoria/:id', component: EditConvocatoriaComponent },

    //CRUD SOLICITUD
    { path: 'showSolicitud', component: ShowSolicitudComponent },
    { path: 'createSolicitud', component: CreateSolicitudComponent },
    { path: 'updateSolicitud/:id', component: EditSolicitudComponent },

    //CRUD INVESTIGADOR
    { path: 'showInvestigador', component: ShowInvestigadorComponent },
    { path: 'createInvestigador', component: CreateInvestigadorComponent },
    { path: 'updateInvestigador/:id', component: EditInvestigadorComponent },
    //CRUD GRUPO INVESTIGACION
    { path: 'showGruposInvestigacion', component: ShowGrupoInvestigacionComponent },
    { path: 'createGrupoInvestigacion', component: CreateGrupoInvestigacionComponent },
    { path: 'updateGrupoInvestigacion/:id', component: EditGrupoInvestigacionComponent },

    //CRUD DEPARTAMENTO
    { path: 'showDepartamentos', component: ShowDepartamentoComponent },
    { path: 'createDepartamento', component: CreateDepartamentoComponent },
    { path: 'updateDepartamento/:id', component: EditDepartamentoComponent },

    //CRUD AREA
    { path: 'showAreas', component: ShowAreaComponent },
    { path: 'createArea', component: CreateAreaComponent },
    { path: 'updateArea/:id', component: EditAreaComponent },

    //DASHBOARD ORGANISMOS
    { path: 'dash-organismo', component: DashboardOrganismoComponent },
    //DASHBOARD INVESTIGADORES
    { path: 'dash-investigador', component: DashboardInvestigadorComponent },
    //DASHBOARD INVESTIGADORES
    { path: 'solicitud-investigador', component: SolicitudInvestigadorComponent },
    
    { path: '**', redirectTo: 'show' }
];

