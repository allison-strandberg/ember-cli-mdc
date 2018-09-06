/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-tabs';

import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

export default Component.extend({
  layout,

  classNames: ['mdc-tabs'],

  activeTab: undefined,

  /// The tab bar element for the tabs.
  _tabBar: null,
  _tabPanels: null,

  _currentActiveTab: undefined,

  didInsertElement () {
    this._super (...arguments);

    // Locate the tab bar element, and create a the tab bar component. Then, start
    // listening for the activated event so we know when to change the tab panel.

    let tabBarElement = this.element.querySelector ('.mdc-tab-bar');
    assert ('The mdc-tabs component must contain a mdc-tab-bar child element.', isPresent (tabBarElement));

    this._tabBar = new mdc.tabBar.MDCTabBar (tabBarElement);
    this._tabBar.listen ('MDCTabBar:activated', this.didActivate.bind (this));

    // Cache the tab panels.
    this._tabPanels = this.element.querySelectorAll ('.mdc-tab-panel');

    // Verify the number of tabs equals the number of panels.
    assert ('The number of mdc-tab elements must equal the number of mdc-tab-panel elements.', this._tabBar.tabList_.length === this._tabPanels.length);

    let activeTab = this.getWithDefault ('activeTab', 0);
    this._activateTabPanel (activeTab);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._tabBar.unlisten ('MDCTabBar:activated', this.didActivate.bind (this));
    this._tabBar.destroy ();
  },

  didActivate ({ detail: { index } }) {
    this._activateTabPanel (index);
  },

  _activateTabPanel (index) {
    if (index === this._currentActiveTab) {
      return;
    }

    if (isPresent (this._currentActiveTab)) {
      this._tabPanels[this._currentActiveTab].classList.remove ('mdc-tab-panel--active');
    }

    this._tabPanels[index].classList.add ('mdc-tab-panel--active');
    this._currentActiveTab = index;
  }
});
