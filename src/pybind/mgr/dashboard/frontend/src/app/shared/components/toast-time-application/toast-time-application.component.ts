import { Component, Input, OnInit } from '@angular/core';

import { CdIndividualConfig } from '../../models/cd-notification';

@Component({
  selector: 'cd-toast-time-application',
  templateUrl: './toast-time-application.component.html',
  styleUrls: ['./toast-time-application.component.scss']
})
export class ToastTimeApplicationComponent implements OnInit {
  @Input()
  config: CdIndividualConfig;

  public timestamp: string;
  public applicationClass: string;
  public application: string;
  private classes = {
    Ceph: 'ceph-icon',
    Prometheus: 'prometheus-icon'
  };

  constructor() {}

  ngOnInit() {
    this.timestamp = this.config.timestamp;
    this.applicationClass = this.classes[this.config.application];
    this.application = this.config.application;
  }
}
