import { Component, OnInit } from '@angular/core';
import { LogServiceService } from 'app/log-service.service';
import { Router } from '@angular/router';

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
  constructor(private service:LogServiceService,private router: Router) {


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
      }
    })
  }

  ngOnInit() {
  }

}
