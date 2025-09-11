import { Component, OnInit, signal } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Loader } from './shared/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('friend-frontend');
  isLoading: boolean = true;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;

        // Force loader to stay visible at least 1s for testing
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoading = false;
      }
    });
  }

}
