import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../constants/api.constant';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { ToastService } from './toast.service';
import { RouterService } from './router.service';
import { AuthService } from './auth.service';
import { Message } from '../interfaces/message.interface';
import { Announcement } from '../interfaces/announcement.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private toaster: ToastService,
    private router: RouterService
  ) {}

  public isLoadingBehaviorSubject = new BehaviorSubject<boolean>(false);

  /**
   * @description Register user details by sending to API
   * @param email email id of user
   * @param password password of user
   * @returns An observable with the JWT token
   */
  registerUser(email: string, password: string): Observable<AuthResponse> {
    let user: any = {
      email: email,
      password: password,
    };

    return this.http.post<AuthResponse>(`${API_ENDPOINT}/register`, user);
  }

  /**
   * @description Login by sending details to API
   * @param email email id of user
   * @param password password of user
   * @returns An observable with the JWT token
   */
  loginUser(email: string, password: string): Observable<AuthResponse> {
    let user: any = {
      email: email,
      password: password,
    };

    return this.http.post<AuthResponse>(`${API_ENDPOINT}/login`, user);
  }

  /**
   * @param id ID of the USER to be fetched
   * @returns User of the specified ID
   */
  fetchUser(id: string): Observable<User> {
    return this.http.get<User>(`${API_ENDPOINT}/users/${id}`);
  }

  /**
   * @returns All users in the DB
   */
  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_ENDPOINT}/users`);
  }

  /**
   * @param id ID of the USER to be updated
   * @param data details of the user to be updated
   * @returns Not really anything
   */
  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${API_ENDPOINT}/users/${id}`, data);
  }

  /**
   * @param id ID of the USER to be deleted
   */
  removeUser(id: string): void {
    this.http.delete(`${API_ENDPOINT}/users/${id}`).subscribe(() => {
      this.toaster.makeToast('Deleted successfully');
    });
  }

  /**
   * @param senderId ID of the sender
   * @param receiverId ID of the receiver
   * @returns All messages exchanged between SENDER and RECEIVER
   */
  getMessagesById(senderId: string, receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${API_ENDPOINT}/chat/${senderId}/${receiverId}`
    );
  }

  /**
   * @description Send message from a user to another user
   * @param msg Message to send
   */
  sendMessage(msg: Message): Observable<Message> {
    return this.http.post<Message>(`${API_ENDPOINT}/chat`, msg);
  }

  /**
   * @returns All announcements
   */
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${API_ENDPOINT}/announcements`);
  }

  /**
   * @param announcement Announcement to make
   * @returns Annoucement made
   */
  postAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(
      `${API_ENDPOINT}/announcements`,
      announcement
    );
  }
}
