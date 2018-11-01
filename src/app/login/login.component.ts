import { Component, OnInit } from '@angular/core';
import { LogServiceService } from 'app/log-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  localUser={
    username:'',
    password:''
  }
  constructor(private service:LogServiceService,private router: Router,private toastr: ToastrService) {


   }
  registrar(){
    console.log(this.localUser);
    this.service.addUser(this.localUser).subscribe(val=>{
      console.log(this.localUser)
    },error=>{console.log();
    }
    )
  }
  login(){
    console.log(this.localUser)
    this.service.getUser(this.localUser.username).subscribe(val=>{
      
      if (val != null){
        if(this.localUser.password == val.contraseña_usuario){
          console.log(val);
          this.router.navigateByUrl('/dashboard')
        
        } 
        
        else{
            this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span>  <b>Contraseña incorrecta</b> - Intente nuevamente.', '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: 'toast-top-center'
          });
        }
      }
    },error=>{
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>  <b>Usuario no existe</b> - Intente nuevamente.', '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-top-center'
      })
    })
  }

  ngOnInit() {
  }

}
