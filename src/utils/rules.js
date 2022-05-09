/* eslint-disable */

export default {
  maxSize: size =>  (value => !value || value.size < size || `Image size should be less than ${size/1000} KB!`),
  isRequired: v => !!v || 'Field cannot be empty',
}