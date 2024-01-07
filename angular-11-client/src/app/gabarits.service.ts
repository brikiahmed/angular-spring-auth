import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GabaritsService {

  
constructor(private _http: HttpClient) { }
  AddGab (data:any): Observable<any> {
return this._http.post(' http://localhost:3000/users',data);
  }
  EditGab (id: string ,data:any): Observable<any> {
    return this._http.put( `http://localhost:3000/users/${id}`,data);
      }
  getGabList():Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }
 
  deleteGab(id : string):Observable<any> {
    return this._http.delete(`http://localhost:3000/Users/${id}`);  }
    
}
