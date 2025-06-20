import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { AuthModal } from "./user/auth-modal/auth-modal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, AuthModal],
  templateUrl: './app.html',

})
export class App {
  protected title = 'client';
}
