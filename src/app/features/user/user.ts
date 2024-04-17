import { Component } from '@angular/core';
import { UserService } from '../../services/features/UserService';

@Component({
  templateUrl: 'user.html',
  styleUrls: ['user.scss'],
  providers:[UserService]
})

export class UserComponent {

  constructor(private service: UserService) { }

  test()
  {
    this.service.testexpiration().subscribe({
      next: () => {
          console.log("test ")
      },
      error: (msg:any) => {
          console.log(msg.error)
      },
      complete: () => console.log("complete")
  });
  }
}