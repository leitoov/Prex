import { Component, OnInit } from '@angular/core';
import {UserService} from '../../api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  arrayPosts:any;


  constructor(public http:UserService,private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.http.User(id).then(
      (data) => { 

        if(data['msj'] ==='OK'){
          this.arrayPosts = data['data'];
          

        }else{
          
        }
      },
      (error) =>{
        console.error(error);
      }
    )
  }
  Openedit(g){
    if(document.getElementById(g).style.display == 'flex'){
      document.getElementById(g).style.display = 'none';
    }else{
      document.getElementById(g).style.display = 'flex';

    }

  }
  
}
