import * as _ from 'lodash';

import { IndividualConfig } from 'ngx-toastr';
import { ToastComponent } from '../components/toast/toast.component';
import { NotificationType } from '../enum/notification-type.enum';

export interface CdIndividualConfig extends IndividualConfig {
  application: string;
  type: NotificationType;
}

export class CdNotificationConfig {
  constructor(
    public type: NotificationType = NotificationType.info,
    public title?: string,
    public message?: string, // Use this for additional information only
    public options?: any | CdIndividualConfig,
    public application: string = 'Ceph',
    public isPermanent: boolean = false
  ) {
    const minimalCdConf = this.getMinimalCdConfig();
    this.options = this.options ? _.merge(this.options, minimalCdConf) : minimalCdConf;
    if (this.isPermanent) {
      this.options = _.merge(this.options, this.getPermanentConfig());
    }
  }

  getPermanentConfig(): Partial<CdIndividualConfig> {
    return {
      disableTimeOut: true,
      closeButton: true,
      positionClass: 'toast-top-full-width'
    };
  }

  getMinimalCdConfig(): Partial<CdIndividualConfig> {
    return {
      application: this.application,
      toastComponent: ToastComponent,
      type: this.type
    };
  }
}
