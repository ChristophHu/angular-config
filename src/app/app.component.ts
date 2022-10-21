import { Component, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  user: string = ''
  devmode: boolean = false

  constructor(private _configService: ConfigService) {}
  
  ngOnInit(): void {
    this.devmode = this._configService.isDevmode()
    this.user = this._configService.getApi('USER')
  }
}
