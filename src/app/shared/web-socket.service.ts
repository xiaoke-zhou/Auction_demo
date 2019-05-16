import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Server } from 'ws';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;

  constructor() { }

  /*----定义方法------*/

  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);

    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data),
        this.ws.onerror = (event) => observer.error(event),
        this.ws.onclose = (event) => observer.complete(),
        this.ws.onopen = (event) => this.sendMessage({productId: id})
        return () => this.ws.close();
      }
    ).pipe(
      map(message => JSON.parse(message))
    );

  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }

}
