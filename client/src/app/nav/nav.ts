import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal-service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {

  constructor(public modalService: ModalService) {}
  ngOnInit(): void {
   
  }

openModal(event: Event) {
  event.preventDefault();
  this.modalService.toggleModal('auth-modal');
}



}
