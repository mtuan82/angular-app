import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-body',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: 'home.html',
    //styleUrl: './login.scss'
  })
  export class HomeComponent {

  }