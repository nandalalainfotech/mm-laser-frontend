import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ControlValueAccessor,
  NgControl,
  Validators,
  NG_VALIDATORS,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  static nextId = 0;
  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'app-time';
  id = `app-time-${TimeComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };
  @Input() sTime: boolean = false;
  @Output() timeChanged = new EventEmitter();
  get empty() {
    const {
      value: { date, hours, minutes, type },
    } = this.parts;

    return !date && !hours && !minutes && !type;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    const {
      value: { hour, minute },
    } = this.parts;
    return `${hour}':'${minute}}`;
  }
  set value(time: string | null) {
    if (time) {
      const [hour, minute] = time.split(':');
      this.parts.patchValue({
        minute: parseInt(minute, 10),
      });
      this.convert24hrsTo12hrsFormat(parseInt(hour, 10));
    }
    this.stateChanges.next();
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.parts = this._formBuilder.group({
      hour: [null, [Validators.required]],
      minute: [0, [Validators.required]],
      type: ['AM', [Validators.required]],
    });

    _focusMonitor.monitor(_elementRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void { }

  writeValue(time: string | null): void {
    this.value = time;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    // console.log("sTime--------->>", this.sTime);
    if (this.parts.invalid) {
      this.errorState = true;
      return;
    } else {
      this.errorState = false;
    }
    const { minute } = this.parts.value;
    const formatted24Hr = this.convert12hrsTo24hrsFormat();
    let finalTime = `${formatted24Hr}:${minute}:${"00"}`;
    // console.log("finalTime", finalTime);
    // const finalTimes = finalTime.split(':').map(e => e.padStart(2, 0)).join(':');

    this.onChange(finalTime);
    this.value = finalTime;
    this.timeChanged.emit(finalTime);
  }
  hoursRange(): Array<number> {
    return _.range(1, 13);
  }
  minutesRange(): Array<number> {
    return _.range(0, 60);
  }

  // Convert 12 Hrs Time Format To 24 Hrs Format By Checking TimeType(AM/PM) If 12AM  Return 0
  // Else If Time Exceed 12 AM Add Selected Hr With 12 Else Return Selected Hr
  convert12hrsTo24hrsFormat(): number {
    let { hour, type } = this.parts.value;
    if (type === 'AM' && hour === 12) return 0;
    if (type === 'PM' && hour < 12) return hour;
    return hour;
  }

  // Convert 24 Hrs Time Format To 12 Hrs Format If Hour Is 0 Set Hr As 12 Else If Hour Is Greater Than
  // 12 Sub Hour By 12  If Hour Is Greater Than Or EqualTo 12 Set Type As PM
  convert24hrsTo12hrsFormat(hour: number): void {
    let selectedHour = hour;
    let selectedTimeType = 'AM';
    if (hour === 0) {
      selectedHour = 12;
    }
    if (hour > 12) {
      selectedHour = hour - 12;
    }
    if (hour >= 12) {
      selectedTimeType = 'PM';
    }
  }
}
