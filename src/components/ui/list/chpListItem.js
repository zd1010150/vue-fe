import chpListItemButton from './chpListItemButton';
import chpListItemLink from './chpListItemLink';
import chpListItemRouter from './chpListItemRouter';
import chpListItemExpand from './chpListItemExpand';
import chpListItemDefault from './chpListItemDefault';

export default {
  functional: true,
  props: {
    href: String,
    disabled: Boolean
  },
  render(createElement, { children, data, props }) {
    const getItemComponent = () => {
      const on = data.on;
      const interactionEvents = [
        'contextmenu',
        'dblclick',
        'dragend',
        'mousedown',
        'touchstart',
        'click'
      ];
      let childrenCount = children.length;

      if (props.href) {
        return chpListItemLink;
      }

      while (childrenCount--) {
        const options = children[childrenCount].componentOptions;

        if (options) {
          if (options.tag === 'chp-list-expand') {
            const expandComponent = children[childrenCount];

            data.scopedSlots = {
              expand: () => expandComponent
            };

            children.splice(childrenCount, 1);

            return chpListItemExpand;
          } else if (options.tag === 'router-link') {
            children[childrenCount].data.staticClass = 'chp-list-item-container chp-button';

            return chpListItemRouter;
          }
        }
      }

      if (on) {
        let counter = interactionEvents.length;

        while (counter--) {
          if (on[interactionEvents[counter]]) {
            return chpListItemButton;
          }
        }
      }

      return chpListItemDefault;
    };

    return createElement(getItemComponent(), { props, ...data }, children);
  }
};
