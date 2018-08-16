import Component from '@ember/component';
import layout from '../templates/components/mdc-div';

import { Theme } from 'ember-cli-mdc-theme';

export default Component.extend (Theme, {
  layout
});
