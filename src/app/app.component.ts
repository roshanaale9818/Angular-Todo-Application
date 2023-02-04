import { Component } from '@angular/core';
import { GoogleObj } from './shared/modal/GoogleObj.interface';
import { GoogletranslateService } from './shared/services/googletranslate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private google:GoogletranslateService
  ){

  }
  title = 'To-do-app';
  }

