'use strict';

(function(w, d) {
  function createElement(tagName, attrs, innerText) {
    const e = d.createElement(tagName);
    if (attrs) {
      for (let key in attrs) {
        e.setAttribute(key, attrs[key]);
      }
    }
    if (innerText) e.innerText = innerText;
    return e;
  }

  class Matrix extends HTMLElement {
    static createMatrix(rows, columns) {
      const node = createElement('div', { class: 'matrix' });
      node.__proto__ = Matrix.prototype;
      node.appendChild(createElement('input', { type: 'submit', class: 'matrix-remove-column', value: '-' }));
      node.appendChild(createElement('input', { type: 'submit', class: 'matrix-remove-row', value: '-' }));
      node.appendChild(createElement('input', { type: 'submit', class: 'matrix-add-column', value: '+' }));
      node.appendChild(createElement('input', { type: 'submit', class: 'matrix-add-row', value: '+' }));
      node.appendChild(createElement('div', { class: 'filler' }));
      node.appendChild(createElement('div', { class: 'filler' }));
      node.setSize(rows, columns);
      return node;
    }
    setSize(rows, columns) {
      rows = Math.max(rows, 1);
      columns = Math.max(columns, 1);
      this.setAttribute('style', `--rows:${rows};--cols:${columns};`);
      this.size = { rows, columns };

      const total = rows*columns;
      if (this.matrix) {
        if (this.matrix.length > total) {
          const removed = this.matrix.splice(total);
          removed.forEach(node => node.remove);
        } else {
          for (let i=this.matrix.length;i<total;i++) {
            this.matrix.push(this.appendChild(createElement('input', {type: 'submit', class: 'matrix-input', value: '0' })));
          }
        }
      } else {
        this.matrix = new Array(total);
        for (let i=0;i<total;i++) {
          this.matrix[i] = this.appendChild(createElement('input', { type: 'submit', class: 'matrix-input', value: '0' }));
        }
      }
    }
    changeSize(rows, columns) {
      return this.setSize(this.size.rows + rows, this.size.columns + columns);
    }
  }

  w._m = Matrix.createMatrix(4, 5);
  d.body.appendChild(w._m);

  d.documentElement.addEventListener('click', function(e) {
    console.log(e);
    for (let className of e.target.classList) {
      switch(className) {
        case 'matrix-add-column':
        e.target.parentElement.changeSize(0, 1);
        break;
        case 'matrix-add-row':
        e.target.parentElement.changeSize(1, 0);
        break;
        case 'matrix-remove-column':
        e.target.parentElement.changeSize(0, -1);
        break;
        case 'matrix-remove-row':
        e.target.parentElement.changeSize(-1, 0);
        break;
        case 'matrix-input':
        e.target.value = e.target.value === '0' ? '1' : '0';
        break;
      }
    }
  });  

  d.documentElement.setAttribute('loaded', 1);
})(window, document);
