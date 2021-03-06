import Component from '@ember/component';
import layout from '../templates/components/mdc-data-table-table';

export default Component.extend({
  tagName: 'table',

  layout,

  classNames: ['mdc-data-table__table'],

  attributeBindings: ['label:aria-label']
});
