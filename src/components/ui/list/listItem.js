import ListItemButton from './listItemButton';
import ListItemLink from './listItemLink';
import ListItemRouter from './listItemRouter';
import listItemExpand from './listItemExpand';
import ListItemDefault from './listItemDefault';

export default {
  functional: true,
  props: {
    href: String,
    disabled: Boolean
  },
  render(createElement, { children, data, props }) {
    const getItemComponent = () => {
      const nativeOn = data.nativeOn;
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
        return ListItemLink;
      }

      if (nativeOn) {
        let counter = interactionEvents.length;

        while (counter--) {
          if (nativeOn[interactionEvents[counter]]) {
            return ListItemButton;
          }
        }
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

            return listItemExpand;
          } else if (options.tag === 'router-link') {
            children[childrenCount].data.staticClass = 'chp-list-item-container chp-button';

            return ListItemRouter;
          }
        }
      }

      return ListItemDefault;
    };

    return createElement(getItemComponent(), { props, ...data }, children);
  }
};
