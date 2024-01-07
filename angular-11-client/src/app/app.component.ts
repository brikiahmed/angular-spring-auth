import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  showHeaderAndSidenav = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        this.showHeaderAndSidenav = !currentRoute.includes('/login');
      }
    });
  }

  shouldShowSidenav(): boolean {
    return this.showHeaderAndSidenav;
  }

  toggleSidebar(): void {
    this.toggleSidebarForMe.emit();
  }
}
