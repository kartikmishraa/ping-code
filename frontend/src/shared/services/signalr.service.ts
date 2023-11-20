import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Announcement } from '../interfaces/announcement.interface';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  constructor() {}

  private conn!: signalR.HubConnection;

  public startConnection = () => {
    this.conn = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7021/announcementHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.conn
      .start()
      .then(() => {
        console.log('Connection started');
        this.conn.on('announcementMade', () => {
          console.log('An announcement was made!');
          // console.log('User: ', user);
          // console.log('Message: ', msg);
        });
      })
      .catch((err) => console.log('Error while starting connection' + err));
  };

  public MakeAnnouncement(announcement: Announcement) {
    this.conn
      .invoke('MakeAnnouncement', announcement)
      .catch((err) =>
        console.log('something went wrong while invoking: ' + err)
      );
  }
}
