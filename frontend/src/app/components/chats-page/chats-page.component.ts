import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'src/shared/interfaces/message.interface';
import { User } from 'src/shared/interfaces/user.interface';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterService } from 'src/shared/services/router.service';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.scss'],
})
export class ChatsPageComponent implements OnInit, AfterViewInit {
  allUsers: User[] = [];
  user!: User;
  receiver!: User;
  messages!: Message[];
  newChat = true;

  @ViewChild('chatSection') chatSection!: ElementRef;
  @ViewChild('chatInput') chatInput!: ElementRef;

  // MatTable Config
  dataSource!: MatTableDataSource<User>;
  displayedColumns = ['name'];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    this.apiService.fetchAllUsers().subscribe((data) => {
      this.allUsers = data;

      // Setting default receiver
      if (this.allUsers[0].id !== this.user.id)
        this.receiver = this.allUsers[0];
      else this.receiver = this.allUsers[1];

      // Fetch messages between sender and receiver
      this.apiService
        .getMessagesById(`${this.user.id}`, `${this.receiver.id}`)
        .subscribe((data) => {
          if (data) this.newChat = false;
          this.messages = data;
          // console.log(this.messages);
        });

      // MatTable Config
      this.dataSource = new MatTableDataSource(this.allUsers);
    });

    this.authService.userData$.subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    // this.scrollContainer = this.chatSection.nativeElement;
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.chatSection.nativeElement.scrollTo(10000, 10000);
  }

  /**
   * @description Open chat with a particular user
   * @param receiver User to chat with
   */
  openChat(receiver: User): void {
    // Setting receiver
    this.receiver = receiver;
    this.newChat = true;
    // Fetching messages between sender and receiver
    this.apiService
      .getMessagesById(`${this.user.id}`, `${this.receiver.id}`)
      .subscribe((data) => {
        if (data) this.newChat = false;
        this.messages = data;
        // console.log(this.messages);
        this.scrollToBottom();
      });
  }

  sendMessage(msg: string): void {
    const MESSAGE: Message = {
      content: msg,
      senderId: `${this.user.id}`,
      receiverId: `${this.receiver.id}`,
    };

    this.apiService.sendMessage(MESSAGE).subscribe((val) => {
      // console.log('msg successfully sent');

      // Fetching messages between sender and receiver
      this.apiService
        .getMessagesById(`${this.user.id}`, `${this.receiver.id}`)
        .subscribe((data) => {
          if (data) this.newChat = false;
          this.messages = data;
          setTimeout(() => this.scrollToBottom(), 50);
          // this.scrollToBottom();
        });
    });

    this.chatInput.nativeElement.value = '';
  }

  /**
   * @description Utility function to apply filter on MatTable
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
