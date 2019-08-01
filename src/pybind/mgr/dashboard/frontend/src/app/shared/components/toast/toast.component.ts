import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { Icons } from '../../enum/icons.enum';
import { CdIndividualConfig } from '../../models/cd-notification';

@Component({
  selector: 'cd-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    // https://github.com/scttcper/ngx-toastr/issues/552
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
      transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
    ])
  ]
})
export class ToastComponent extends Toast {
  public textClass: string;
  public iconClass: string;
  public timestamp: string;
  public application: string;
  public applicationClass: string;

  private textClasses = ['text-danger', 'text-info', 'text-success'];
  private iconClasses = [Icons.warning, Icons.info, Icons.check];

  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
    const config = toastPackage.config as CdIndividualConfig;
    this.timestamp = new Date().toJSON();
    this.application = config.application;
    this.applicationClass = this.classes[this.application];
    this.iconClass = this.iconClasses[config.type];
    this.textClass = this.textClasses[config.type];
  }

  private classes = {
    Ceph: 'ceph-icon',
    Prometheus: 'prometheus-icon'
  };
}
