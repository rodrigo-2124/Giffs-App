import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent {

  constructor(
    private gifsService: GifsService
  ) { }


  get historial(){
    return this.gifsService.historial;
  }

   buscar(termino: string){
      this.gifsService.buscarGifs(termino);
   }

}
