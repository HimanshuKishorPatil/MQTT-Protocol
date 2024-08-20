import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(public mqttService: WebsocketService) {
    
  }

  controlLight(status:string){
   this.mqttService.controlLight(status);
  }

}
