#### MUSE-UI

1. popover component should input close event handler.otherwise the popover will not disappear when you click the outside context.


#### vee-validate

1. 注意一定要使用***v-model.lazy*** 去绑定自定义控件的value值，不能使用 `:value` 否则vee-validate会获取不到控件的值，导致验证失败[https://github.com/baianat/vee-validate/issues/118](https://github.com/baianat/vee-validate/issues/118)


#### VUE

1. don`t change the prop value in the method,should emit the change event to the parent component ,in the parent to
change the prop.

2. Change the DOM but cann`t reflect the variation to  the corresponding of VUE data immediately.So you can use the
[this.$nextTick](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列) to mannually update the
VUE data.


#### 
1. 页面的状态都存储在vuex中，会在页面重新load的时候存入到localstorage中，所以除了页面初始化的时候，其余时候，都要去vuex中拿状态，包括用户信息，token都在vuex中

