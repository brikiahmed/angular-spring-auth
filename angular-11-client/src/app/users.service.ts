import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private _http: HttpClient) { }
  AddUser (data:any): Observable<any> {
return this._http.post(' http://localhost:3000/users',data);
  }
  EditUser (Matricule: string ,data:any): Observable<any> {
    return this._http.put( `http://localhost:3000/users/${Matricule}`,data);
      }
  getUserList():Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }
 
  deleteUser(Matricule : string):Observable<any> {
    return this._http.delete(`http://localhost:3000/Users/${Matricule}`);  }
    
}
