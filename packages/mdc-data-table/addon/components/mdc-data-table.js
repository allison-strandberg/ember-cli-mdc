/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table';

const { MDCDataTable } = mdc.dataTable;

export default Component.extend({
  layout,

  classNames: ['mdc-data-table'],

  _dataTable: null,

  didInsertElement () {
    this._super (...arguments);

    this._dataTable = new MDCDataTable (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    // Temp disable because there is a bug in the raw data table if the data table does
    // not contain a checkbox.

    //this._dataTable.destroy ();
  }
});
