import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  async ngOnInit(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 sec delay
  }
}
