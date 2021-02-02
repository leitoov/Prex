import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }
  
  LoginUsers(username,password){
    return this.http
    .get('https://leonelvincent.com/prex/login.php?username='+username+'&password='+password)
    .toPromise();

  } 
  Createuser(username,password,name,last_name){
    return this.http
    .get('https://leonelvincent.com/prex/registro.php?name='+name+'&last_name='+last_name+'&username='+username+'&password='+password)
    .toPromise();

  }
  User(username){
    return this.http
    .get('https://leonelvincent.com/prex/ViewMovie.php?username='+username)
    .toPromise();

  } 

  
}
