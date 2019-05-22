import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdModalContent } from 'src/app/modal-signin/modal-signin.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

constructor(private NgbModal: NgbModal) { }

//  modalcomponent: ModalSigninComponent;
  // open(message : string ) {
  //   const modalRef = this.NgbModal.open(NgbdModalContent);
  //   modalRef.componentInstance.content = message;
  // }
}
