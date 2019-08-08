import { ToastComponent } from '../components/toast/toast.component';
import { NotificationType } from '../enum/notification-type.enum';
import { CdNotificationConfig } from './cd-notification';

describe('cd-notification classes', () => {
  const expectObject = (something: object, expected: object) => {
    Object.keys(expected).forEach((key) => {
      if (key !== 'options') {
        expect(something[key]).toBe(expected[key]);
      } else {
        Object.keys(expected[key]).forEach((optionKey) => {
          expect(something[key][optionKey]).toBe(expected[key][optionKey]);
        });
      }
    });
  };
  // As these Models have a view methods they need to be tested
  describe('CdNotificationConfig', () => {
    it('should create a new config without any parameters', () => {
      expectObject(new CdNotificationConfig(), {
        application: 'Ceph',
        message: undefined,
        options: {
          application: 'Ceph',
          toastComponent: ToastComponent,
          type: 1
        },
        title: undefined,
        type: 1
      });
    });

    it('should create a new config with parameters', () => {
      expectObject(
        new CdNotificationConfig(
          NotificationType.error,
          'Some Alert',
          'Something failed',
          undefined,
          'Prometheus'
        ),
        {
          application: 'Prometheus',
          message: 'Something failed',
          options: {
            application: 'Prometheus',
            toastComponent: ToastComponent,
            type: 0
          },
          title: 'Some Alert',
          type: 0
        }
      );
    });

    it('should merge existing option parameters', () => {
      expectObject(
        new CdNotificationConfig(NotificationType.success, 'Notification', 'Notification text', {
          progressBar: true
        }),
        {
          application: 'Ceph',
          message: 'Notification text',
          options: {
            application: 'Ceph',
            toastComponent: ToastComponent,
            type: 2,
            progressBar: true
          },
          title: 'Notification',
          type: 2
        }
      );
    });

    it('should add a permanent config', () => {
      expectObject(
        new CdNotificationConfig(
          NotificationType.success,
          'Notification',
          'Notification text',
          undefined,
          'Ceph',
          true
        ),
        {
          application: 'Ceph',
          message: 'Notification text',
          options: {
            application: 'Ceph',
            toastComponent: ToastComponent,
            type: 2,
            disableTimeOut: true,
            closeButton: true,
            positionClass: 'toast-top-full-width'
          },
          title: 'Notification',
          type: 2
        }
      );
    });

    it('should add a permanent config with other option parameters', () => {
      expectObject(
        new CdNotificationConfig(
          NotificationType.success,
          'Notification',
          'Notification text',
          { progressBar: true },
          'Ceph',
          true
        ),
        {
          application: 'Ceph',
          message: 'Notification text',
          options: {
            application: 'Ceph',
            toastComponent: ToastComponent,
            type: 2,
            disableTimeOut: true,
            closeButton: true,
            positionClass: 'toast-top-full-width',
            progressBar: true
          },
          title: 'Notification',
          type: 2
        }
      );
    });
  });
});
