import { Component, OnInit } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from "ng2-semantic-ui";

interface IInfoModalContext {
    title:string;
    question:string;
}

@Component({
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent {
  constructor(public modal:SuiModal<IInfoModalContext, void, void>) {}
}

export class InfoModal extends ComponentModalConfig<IInfoModalContext, void, void> {
  constructor(title:string, question:string, size = ModalSize.Small) {
      super(InfoModalComponent, { title, question });
      this.isClosable = false;
      this.transitionDuration = 200;
      this.size = size;
  }
}
