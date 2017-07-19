export default {
  methods:{
    errorClass(key){
      return {
        'has-error' : this.errors.has(key)
      }
    }
  }
}
