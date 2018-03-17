import store from '../store'

/**
 * Global object for handling whether or not a user is actually logged in
 * and if they have the required privileges for viewing certain components
 */
function User () {

  /**
   * @type {Array} holder for the permission types
   */
  this.permissions = []

  /**
   * @type {Integer} Holder for the user's id number
   */
  this.userId = null

  /**
   * Determines if a user is actually logged in
   * @return {Boolean} True for logged in; False otherwise
   */
  this.isLoggedIn = () => {
    if( !this.userId ) {
      this.userId = store.getState().user.id
    }
    return Number.isInteger(this.userId)
  }

  /**
   * Determines if the user has permissions that can be used for determining
   * individual component access
   * @return {Boolean}
   */
  this.hasPermissions = () => {
    const state = store.getState()
    if( this.permissions.length <= 0 && state.user.permissions ){
      this.permissions = state.user.permissions.split(',')
      return this.permissions.length > 0
    } else if( this.permissions.length > 0 ) {
      return true
    } else {
      return false
    }
  }

  /**
   * Determines if the user has one of the administrative privileges
   * @return {Boolean}
   */
  this.isGuest = () => this.includes('guest')
  this.isUser = () => this.includes('user')
  this.isStudent = () => this.includes('student')
  this.isAdmin = () => this.includes('admin')
  this.isSuper = () => this.includes('super')

  /**
   * Helper function for determining existing privileges
   * @param {String} type - the type of privilege to be detected
   * @return {Boolean}
   */
  this.includes = ( type = 'admin' ) => {
    if( this.hasPermissions() ) {
      return this.permissions.includes(type)
    }
  }
}

export default User
