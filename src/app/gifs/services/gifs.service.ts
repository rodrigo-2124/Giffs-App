import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string= '7nHksLvKF48X07MJyhJTR5Y7zVcXBiL5';
  private _historial: string[]= [];

  public resultados: Gif[]= [];
  
  get historial(){
    return [...this._historial];  //rompe la referencia, por seguridad
  }

  constructor(
    private http: HttpClient
  ){}

  buscarGifs(query: string){
    query= query.trim().toLowerCase();
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial= this._historial.splice(0, 10);
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=7nHksLvKF48X07MJyhJTR5Y7zVcXBiL5&q=${query}&limit=100`)
    .subscribe( response=>{
      console.log(response.data);
      this.resultados= response.data; 
    });
  }


}
