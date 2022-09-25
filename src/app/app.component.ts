import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div [routerLink]="['']">Home</div>
    <div [routerLink]="['login']">Login</div>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .logo.angular:hover {
        filter: drop-shadow(0 0 2em #e32727);
      }
    `,
  ]
})
export class AppComponent { }
