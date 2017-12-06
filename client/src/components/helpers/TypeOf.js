const TypeOf = {
  addresses: [
    { key: 'Home', value: 'Home', text: 'Home' },
    { key: 'Work', value: 'Work', text: 'Work' },
    { key: 'Other', value: 'Other', text: 'Other' },
  ],
  emails: [
    { key: 'Home', value: 'Home', text: 'Home' },
    { key: 'Work', value: 'Work', text: 'Work' },
    { key: 'Mobile', value: 'Mobile', text: 'Mobile' },
    { key: 'Satellite', value: 'Satellite', text: 'Satellite' },
  ],
  // NOTE: this only works inside a function. So, use 'get' and 'set'. Javascript!!!
  get telephones(){
    return this.addresses
  },
}

export default TypeOf
