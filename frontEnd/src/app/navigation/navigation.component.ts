import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { NgForm } from '@angular/forms';
import { User, UserService } from '../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  loggedUser!: User;
  location: Location;
  logStatus = true;
  constructor(location: Location, private userService:UserService) { this.location = location; }

  ngOnInit(): void {
  }
  public isLoggedIn(){
    return this.logStatus;
  }

  public login(user: NgForm){
    this.userService.getUser(user.value)
      .then(response => {
        this.loggedUser = response[0];
        if (this.loggedUser.password === user.value.password){
          console.log(this.loggedUser.username);
          this.logStatus = true;
        } else {
          console.log("error: ", this.loggedUser.username);
        }
      }).catch(err => console.log(err)
      );
  }

  public logout(){
    this.logStatus = false;
  }

  public isActive(url:string):string{
    const currentPath = this.location.path().split("/")[1];
        console.log(currentPath);
        return (url === currentPath ? 'active':'');
  }

}
