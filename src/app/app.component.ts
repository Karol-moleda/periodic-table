import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTablePageComponent } from './periodic-table-page/periodic-table-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PeriodicTablePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
