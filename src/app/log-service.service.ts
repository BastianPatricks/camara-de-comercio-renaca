import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientJsonpModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { ResponseContentType } from '@angular/http';
import { BrowserXhr } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {
  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  public header: any;
  public host: any;
  isLoggedin: boolean;


  //headers = new Headers({ 'Content-Type': 'application/json' });  
  //options = new RequestOptions({ headers: this.headers });

  constructor(private httpClient: HttpClient, private http: Http) {
    this.host = 'http://127.0.0.1:8000';
    this.header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', "method": "post" });
  }

  isAuthenticated() {
    let token = sessionStorage.getItem('id');
    if (token) {
      return true;
    }
    return false;
  }

  //Ejemplo GET
  getUser(user): Observable<any> {
    //console.log(this.host+'/authController/'+user)
    return this.http.get(this.host + '/userController/' + user)
      .map((res: Response) => res.json())
  }
  //Ejemplo POST
  addUser(user): Observable<any> {
    return this.httpClient.post(this.host + "/addUser", user, this.header);
  }

}
