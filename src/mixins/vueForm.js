import VueForm from 'vue-form';


export default Object.assign(new VueForm({
  inputClasses: {
    invalid: 'has-error'
  },
  validators: {
    'password-strength': function(value) {
      return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
    }
  }

}), {
  methods: {
    fieldClassName: function(field) {
      if (!field) {
        return '';
      }
      if ((field.$touched || field.$submitted) && field.$valid) {
        // return 'has-success';
      }
      if ((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-error';
      }
    }
  }
});
