import { DatePipe } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastPackage, ToastRef, ToastrModule } from 'ngx-toastr';

import { configureTestBed } from '../../../../testing/unit-test-helper';
import { NotificationType } from '../../enum/notification-type.enum';
import { CdIndividualConfig } from '../../models/cd-notification';
import { CdDatePipe } from '../../pipes/cd-date.pipe';
import { ToastComponent } from './toast.component';

@Injectable() // https://github.com/scttcper/ngx-toastr/issues/339
class MockToastPackageSuccess extends ToastPackage {
  constructor() {
    const toastConfig = { application: 'Ceph', type: NotificationType.success };
    super(
      1,
      <CdIndividualConfig>toastConfig,
      'Test Message',
      'Test Title',
      'show',
      new ToastRef(null)
    );
  }
}
@NgModule({
  providers: [{ provide: ToastPackage, useClass: MockToastPackageSuccess }],
  imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
  exports: [ToastrModule]
})
export class ToastrTestingModuleSuccess {}

@Injectable() // https://github.com/scttcper/ngx-toastr/issues/339
class MockToastPackageError extends ToastPackage {
  constructor() {
    const toastConfig = { application: 'Prometheus', type: NotificationType.error };
    super(
      1,
      <CdIndividualConfig>toastConfig,
      'Test Message',
      'Test Title',
      'show',
      new ToastRef(null)
    );
  }
}
@NgModule({
  providers: [{ provide: ToastPackage, useClass: MockToastPackageError }],
  imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
  exports: [ToastrModule]
})
export class ToastrTestingModuleError {}

@Injectable() // https://github.com/scttcper/ngx-toastr/issues/339
class MockToastPackageInfo extends ToastPackage {
  constructor() {
    const toastConfig = { application: 'Ceph', type: NotificationType.info };
    super(
      1,
      <CdIndividualConfig>toastConfig,
      'Test Message',
      'Test Title',
      'show',
      new ToastRef(null)
    );
  }
}
@NgModule({
  providers: [{ provide: ToastPackage, useClass: MockToastPackageInfo }],
  imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
  exports: [ToastrModule]
})
export class ToastrTestingModuleInfo {}

@Injectable() // https://github.com/scttcper/ngx-toastr/issues/339
class MockToastPackageDefault extends ToastPackage {
  constructor() {
    super(1, null, 'Test Message', 'Test Title', 'show', new ToastRef(null));
  }
}
@NgModule({
  providers: [{ provide: ToastPackage, useClass: MockToastPackageDefault }],
  imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
  exports: [ToastrModule]
})
export class ToastrTestingModuleDefault {}

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  configureTestBed({
    declarations: [ToastComponent, CdDatePipe],
    imports: [ToastrTestingModuleSuccess],
    providers: [DatePipe]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a timestamp', () => {
    expect(component.timestamp).toBeDefined();
  });
});

describe('ToastComponent success', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  configureTestBed({
    declarations: [ToastComponent, CdDatePipe],
    imports: [ToastrTestingModuleSuccess],
    providers: [DatePipe]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the right success attributes', () => {
    expect(component.textClass).toBe('text-success');
    expect(component.iconClass).toBe('fa fa-check');
  });

  it('should set the Ceph icon', () => {
    expect(component.application).toBe('Ceph');
    expect(component.applicationClass).toBe('ceph-icon');
  });
});

describe('ToastComponent error', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  configureTestBed({
    declarations: [ToastComponent, CdDatePipe],
    imports: [ToastrTestingModuleError],
    providers: [DatePipe]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the right error attributes', () => {
    expect(component.textClass).toBe('text-danger');
    expect(component.iconClass).toBe('fa fa-exclamation-triangle');
  });

  it('should set the Prometheus icon', () => {
    expect(component.application).toBe('Prometheus');
    expect(component.applicationClass).toBe('prometheus-icon');
  });
});

describe('ToastComponent info', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  configureTestBed({
    declarations: [ToastComponent, CdDatePipe],
    imports: [ToastrTestingModuleInfo],
    providers: [DatePipe]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the right info attributes', () => {
    expect(component.textClass).toBe('text-info');
    expect(component.iconClass).toBe('fa fa-info');
  });

  it('should set the Ceph icon', () => {
    expect(component.application).toBe('Ceph');
    expect(component.applicationClass).toBe('ceph-icon');
  });
});
