import { Component } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from "ng2-semantic-ui";

interface IConfirmModalContext {
    title:string;
    question:string;
}

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent {
  constructor(public modal:SuiModal<IConfirmModalContext, void, void>) {}
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(title:string, question:string, size = ModalSize.Small) {
      super(ConfirmModalComponent, { title, question });
      this.isClosable = false;
      this.transitionDuration = 200;
      this.size = size;
  }
}