import {Component} from '@angular/core';

@Component({
  selector: 'sv-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  json = JSON.stringify({
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 123,
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  });

  options = {
    mode: 'tree',
    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function(err) {
      alert(err.toString());
    },
    onModeChange: function(newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode);
    }
  };

  constructor() {}

}
