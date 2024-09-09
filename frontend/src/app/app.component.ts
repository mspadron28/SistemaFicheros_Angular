import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrudService } from './services/crud.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FontAwesomeModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(private crudService:CrudService){

  }

  ngOnInit():void{
    this.crudService.getTasks().subscribe((res)=>{
      console.log(res);
    })
  }
}
