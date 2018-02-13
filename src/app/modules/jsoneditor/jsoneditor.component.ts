import {Component, OnInit, AfterViewInit, Input, forwardRef, Renderer2, ElementRef, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as JSONEditor from 'jsoneditor';

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

  _editor: any;
  _onTouched: any;
  _onChange: any;
  _json: any;
  _options: any = {
      mode: 'tree',
      modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
      onError: function(err) {
        alert(err.toString());
      },
      onChange: function() {
        console.log('change');
      },
      indentation: 4,
      escapeUnicode: true
    };

  get options() {
    return this._options;
  }

  @Input()
  set options(val) {
    this._options = val;
    // this._onChange(this._fieldControl);
  }

  @Input()
    set ngModel(val) {
    this._json = val;
  }

  writeValue(obj: any): void {
    this._json = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }


  ngOnInit(): void {
    const editorElement = this.element.nativeElement.children[0];
    this._editor = new JSONEditor(editorElement, this.options);
    this._editor.set(this._json);
    this._editor.expandAll();
  }

  constructor(private element: ElementRef, _renderer: Renderer2) {}


}
