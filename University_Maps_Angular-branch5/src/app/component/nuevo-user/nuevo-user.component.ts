import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nuevo-user',
  templateUrl: './nuevo-user.component.html',
  styleUrls: ['./nuevo-user.component.css']
})
export class NuevoUserComponent implements OnInit{
  role:string="USER";
  form:FormGroup=new FormGroup({});
  user:User=new User();
  mensaje: string="";
  constructor(public route:ActivatedRoute,private router: Router,private uS:UserService){}
  ngOnInit(): void {
    this.form=new FormGroup({
      usuario:new FormControl(),
      contra:new FormControl()
    })
  }
  aceptar():void{
    this.user.user=this.form.value['usuario'];
    this.user.password=this.form.value['contra'];
    if (this.form.value['usuario'].length>0) {
        this.uS.insert(this.user).subscribe(data=>{
          this.uS.list().subscribe(data=>{
            this.uS.setList(data);
          })
        })
        this.router.navigate(['/login']);
    }
    else{
      this.mensaje="Ingrese dato";
    }
  }
}
