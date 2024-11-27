import { Component, OnDestroy, OnInit } from "@angular/core";
import { getCookie, setCookie } from "../utils/cookies";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { interval, Subscription } from "rxjs";

@Component({
    standalone: true,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        CommonModule, 
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
    uName = getCookie('uName') || 'USER NOT LOGGED IN!!';
    expireTime = getCookie('expiresAt');
    timeRemaining: string = '';
    private timerSubscription: Subscription | null = null;
  
    constructor(private router: Router) {
    }
  
    ngOnInit(): void {
      const isLoggedIn = getCookie('loggedIn');
      console.log("isLoggedIn", isLoggedIn);
      if (!isLoggedIn) {
        setCookie(undefined, true);
        this.router.navigate(['']);
      } else {
        this.startCountdown();
      }
    }
  
    startCountdown() {

      if (!this.expireTime) {console.log("what");return};
  
      this.timerSubscription = interval(1000).subscribe(() => {
        const now = new Date().getTime();
        const timeLeft = Number(this.expireTime) - now;
  
        if (timeLeft <= 0) {
          this.timeRemaining = '0:00:00';
          this.timerSubscription?.unsubscribe();
          setCookie(undefined, true);
          this.router.navigate(['']);
          return;
        }
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        this.timeRemaining = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });
    }
  
    ngOnDestroy() {
      this.timerSubscription?.unsubscribe();
    }

    logout() {
        setCookie(undefined, true);
        setCookie('uName=USER NOT LOGGED IN!!', true);
        setCookie('expiresAt=', true);
        this.router.navigate(['']);
    }
  }
