import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string= '7nHksLvKF48X07MJyhJTR5Y7zVcXBiL5';
  private _servicioUrl= 'https://api.giphy.com/v1/gifs';
  private _historial: string[]= [];

  public resultados: Gif[]= [];
  
  get historial(){
    return [...this._historial];  //rompe la referencia, por seguridad
  }

  constructor(
    private http: HttpClient
  ){
    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados= JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial= JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string){
    query= query.trim().toLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial= this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params= new HttpParams().set('api_key', this._apiKey)       //formar la URL de forma amigable
                                  .set('q', query)
                                  .set('limit', '10');

    //console.log(params);
    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search?`, {params})
    .subscribe( response=>{
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      this.resultados= response.data; 
    });
  }


}
