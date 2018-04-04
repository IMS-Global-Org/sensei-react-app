class Weekdays {
  constructor() {
    this.numMap = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    }
    this.abbMap = {
      'Sun': 'Sunday',
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday',
    }
  }

  mapAbvToDay = ( abbreviation ) => {
    return this.abbMap[ abbreviation ]
  }

  mapNumToAbb = ( number ) => {
    return this.numMap[ number ]
  }

  mapNumToDay = ( number ) => {
    const abb = this.numMap[ number ]
    return this.abbMap[ abb ]
  }

  mapDayToAbb = ( day ) => {
    return Object.entries(this.abbMap).find( keyVal => keyVal[1] === day )[0]
  }

  mapDayToNum = ( day ) => {
    const abb = this.mapDayToAbb(day)
    return Object.entries(this.numMap).find( keyVal => keyVal[1] === abb )[0]
  }

  /**
   * @param {String} string - comma separated string of weekdays
   */
  contains = ( string ) => {
    const strArray = string.split(',')
    const abb = Object.keys(this.abbMap)
    return strArray.every( day => abb.includes(day) )
  }

  listAbbreviations = () => {
    return Object.keys(this.abbMap)
  }

}

export default Weekdays
