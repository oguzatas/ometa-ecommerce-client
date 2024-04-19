import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(
    message: string,
    messageType: MessageType,
    position: Position,
    delay: number = 3,
    dismissOthers: boolean = false
  ) {
    alertify.set('notifier', 'delay', delay);
    alertify.set('notifier', 'position', position);

    const msg = alertify[messageType](message);
    if (dismissOthers) {
      msg.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopCenter = 'top-center',
  BottomCenter = 'bottom-center',
}
