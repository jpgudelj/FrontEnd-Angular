import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import {MatPaginator} from '@angular/material/paginator';



export interface PosicionesElement {
  razonSocial: string;
  nombre: string;
  fechaEntregaInicio: string;
  precio: number;
  monedad: string;
}




@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  posiciones: any[] = [];
  datos: PosicionesElement[] = [];

  displayedColumns: string[] = ['nombreEmpresa', 'nombre', 'fechaEntregaInicio', 'precio','moneda'];
  dataSource = null;

   constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private http : HttpClient
  ) { 
   
    
  
  }

  ngOnInit() {
    console.log ("iniciado ngOnInit");
     this.http.get('http://localhost/BackEnd/public/posiciones').subscribe(
      (data : any) => {
        //console.log(data);
        this.posiciones = data;
        
        for (let pos of this.posiciones){
          this.datos.push(pos);
          this.dataSource = new MatTableDataSource(this.datos);
         }
         console.log(this.datos);
      }
    )
   
    
   
  }
}
