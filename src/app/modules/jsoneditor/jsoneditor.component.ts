import {Component, OnInit, AfterViewInit, Input, forwardRef, Renderer2, ElementRef, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as JSONEditor from 'jsoneditor';

const noop = () => {
};

@Component({
  selector: 'sv-json-editor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonEditorComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorComponent implements OnInit, ControlValueAccessor {

  _jsonString: string;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private _editor: any;
  private _modes: string[] = ['code', 'form', 'text', 'tree', 'view'];
  private _mode = 'tree';
  private _options: any;

  get mode() {
    return this._mode;
  }
  @Input()
  set mode(val) {
    this._mode = val;
  }
  get modes() {
    return this._modes;
  }

  @Input()
  set modes(val) {
    this._modes = val;
  }

  // ngModel getter
  get value(): string {
    return this._jsonString;
  };

  // set ngModel value including call the onchange callback
  @Input()
  setValue(v: string) {
    if (v !== this._jsonString) {
      this._jsonString = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: string) {
    if (value !== this._editor.getText()) {
      this._jsonString = value;
      this._editor.setText(value);
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit(): void {
    const options = {
      mode: this.mode,
      modes: this.modes,
      onError: function(err) {
        console.error(err.toString());
      },
      onChange: () => {
        console.log('jsoneditor onChange');
        this.setValue(this._editor.getText());
      },
      indentation: 4,
      escapeUnicode: true
    };
    const editorElement = this.element.nativeElement;
    this._editor = new JSONEditor(editorElement, options);
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  constructor(private element: ElementRef, _renderer: Renderer2) {}


}
