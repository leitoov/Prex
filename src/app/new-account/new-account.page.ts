import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MenuController, NavController, LoadingController } from '@ionic/angular';
import {UserService} from '../api/user.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  @ViewChild('passwordEyeRegister') passwordEye;
  iconpassword  =  'eye-off';
  passwordTypeInput  =  'password';
  Formaccount: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private menu: MenuController,
    public http:UserService,
    private navCtrl: NavController,
    public loadingController: LoadingController
  ) { 
    this.Formaccount = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.menu.enable(false);

  }

  ngOnInit() {
  }

  ApiNewUser(){
    this.http.Createuser(this.Formaccount.value['username'], this.Formaccount.value['password'],this.Formaccount.value['name'], this.Formaccount.value['last_name']).then(
      (data) => { 
        if(data['insert'] ==='OK'){
          alert('si');
          this.Formaccount.reset();
          this.navCtrl.navigateForward('/login');


        }else{
          alert('');
        }
      },
      (error) =>{
        alert('no');
        console.error(error);
      }
    )
  }
  saveData(){
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.ApiNewUser();
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }
  

}
