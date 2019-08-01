import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { configureTestBed } from '../../../../testing/unit-test-helper';
import { CdIndividualConfig } from '../../models/cd-notification';
import { CdDatePipe } from '../../pipes/cd-date.pipe';
import { ToastTimeApplicationComponent } from './toast-time-application.component';

describe('ToastTimeApplicationComponent', () => {
  let component: ToastTimeApplicationComponent;
  let fixture: ComponentFixture<ToastTimeApplicationComponent>;

  configureTestBed({
    declarations: [ToastTimeApplicationComponent, CdDatePipe],
    providers: [DatePipe]
  });

  const configCeph: Partial<CdIndividualConfig> = {
    application: 'Ceph',
    timestamp: new Date().toJSON()
  };

  const configPrometheus: Partial<CdIndividualConfig> = {
    application: 'Prometheus',
    timestamp: new Date().toJSON()
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastTimeApplicationComponent);
    component = fixture.componentInstance;
    component.config = configCeph as CdIndividualConfig;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a timestamp', () => {
    expect(component.timestamp).toBeDefined();
  });

  describe('ToastTimeApplicationComponent Ceph application', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ToastTimeApplicationComponent);
      component = fixture.componentInstance;
      component.config = configCeph as CdIndividualConfig;
      component.ngOnInit();
    });

    it('should set application correctly', () => {
      expect(component.application).toBeDefined();
      expect(component.application).toBe('Ceph');
    });

    it('should set applicationClass correctly', () => {
      expect(component.applicationClass).toBeDefined();
      expect(component.applicationClass).toBe('ceph-icon');
    });
  });

  describe('ToastTimeApplicationComponent Prometheus application', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ToastTimeApplicationComponent);
      component = fixture.componentInstance;
      component.config = configPrometheus as CdIndividualConfig;
      component.ngOnInit();
    });

    it('should set a Prometheus application', () => {
      expect(component.application).toBeDefined();
      expect(component.application).toBe('Prometheus');
    });

    it('should set a Prometheus applicationClass', () => {
      expect(component.applicationClass).toBeDefined();
      expect(component.applicationClass).toBe('prometheus-icon');
    });
  });
});
