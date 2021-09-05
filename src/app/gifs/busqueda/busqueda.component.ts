import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;   //investigar sobre ElementRef y ! (Non-null assertion operator)
  
  constructor(
    private gifsService: GifsService
  ){}
  
  buscar(){
    const valor= this.txtBuscar.nativeElement.value;
    if(valor.trim().length==0)return;   //trim() quita los espacios de una cadena
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value= '';
  }

}
