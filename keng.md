#### MUSE-UI

1. popover component should input close event handler.otherwise the popover will not disappear when you click the outside context.



#### VUE

1. don`t change the prop value in the method,should emit the change event to the parent component ,in the parent to
change the prop.

2. Change the DOM but cann`t reflect the variation to  the corresponding of VUE data immediately.So you can use the
[this.$nextTick](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列) to mannually update the
VUE data.
