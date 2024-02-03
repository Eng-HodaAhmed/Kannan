import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class RequestesService {
 baseUrl="http://innovitix.com:8001/kannan/";
 hegriApi="http://api.aladhan.com/v1/gToH/"
  constructor(private http:HttpClient) { }

  // getHejriDate(date:string){
    
  //   return this.http.get<HijriDate>(this.hegriApi+date)
  // }



}

