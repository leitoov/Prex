import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular';
import {UserService} from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('passwordEyeRegister') passwordEye;
  iconpassword  =  'eye-off';
  passwordTypeInput  =  'password';
  FormLogin: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private menu: MenuController,
    public http:UserService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController :AlertController
  )
  { 
    this.FormLogin = this.formBuilder.group({
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
    this.menu.enable(false);

  }

  ngOnInit() { }
  
  ApiLogin(){
    this.http.LoginUsers(this.FormLogin.value['name'], this.FormLogin.value['password']).then(
      (data) => { 
        if(data['msj'] ==='OK'){
          this.presentLoading();
          this.FormLogin.reset();
          this.navCtrl.navigateForward('/home/'+data['email']);
        }else{
          this.presentAlert();
        }
      },
      (error) =>{
        console.error(error);
      }
    )
  }
  saveData(){
    this.ApiLogin();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Please',
      message: 'Check credentials',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  }
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }
  

}
