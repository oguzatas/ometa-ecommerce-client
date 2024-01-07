import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: '[tib-dock]',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
})
export class DockComponent {
  menu = [
    {
      img: 'home.png',
      title: 'Ana sayfa',
      link: 'welcome',
      roleCheck: 'no',
    },
    {
      img: 'cogs-solid.png',
      title: 'Ayarlar',
      link: 'settings',
      roleCheck: 'Admin',
    },
    {
      img: 'users-solid.png',
      title: 'Kullanıcılar',
      link: 'users',
      roleCheck: 'Admin',
    },
  ];

  constructor(public auth: AuthService) {}

  getBotUsername() {
    const item = localStorage.getItem('systemSettings');
    if (item) {
      return JSON.parse(item).telegramBotUserName;
    } else {
      return null;
    }
  }
}
