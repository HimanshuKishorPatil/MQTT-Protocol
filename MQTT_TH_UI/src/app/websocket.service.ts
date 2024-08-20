

import { Injectable } from '@angular/core';
import { Client, Message } from 'paho-mqtt';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  client: Client;
  temperature: number | undefined;
  humidity: number | undefined;

  constructor() {
    this.client = new Client('broker.hivemq.com', Number(8000), 'clientId-' + Math.random());
     delay(0)
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;

    this.client.connect({ onSuccess: this.onConnect });
  }

  // MQTT onConnect callback
  onConnect = () => {
    console.log('Connected to MQTT broker');
    this.client.subscribe('Tempdata');
  }

  // MQTT onConnectionLost callback
  onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection lost:', responseObject.errorMessage);
    }
  }

  // MQTT onMessageArrived callback
  onMessageArrived = (message: Message) => {
    console.log('Message arrived:', message.payloadString);
    const data = message.payloadString.split(',');
    this.temperature = parseFloat(data[0]);

    this.humidity = parseFloat(data[1]);
   
  }

  controlLight(status:string){
    const message=new Message(status);
    message.destinationName='lights'
    this.client.send(message)
  }

}