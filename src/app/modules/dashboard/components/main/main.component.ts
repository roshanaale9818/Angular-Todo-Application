import { Component } from '@angular/core';
import { User } from 'src/app/shared/modal/user.inteface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
users:User[]=[];
}
