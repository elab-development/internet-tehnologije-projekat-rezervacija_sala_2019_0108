import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub: Subscription;
  public isAuthenticated = false;
  public isAdmin = false;
  private currentUser: User;


  constructor(private authService: AuthService){

  }
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) { 
        this.isAdmin = user.email === "admin@gmail.com";
        this.currentUser = user;
      } else {
        this.isAdmin = false;
        this.currentUser = null; 
      }
    });
    
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();    
  }

  onLogout(){
    this.authService.logout();
  }

}
