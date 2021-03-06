const defaults = {
  data: [],
  pagination: {},
  activePosting: {
    videos: [],
    links: [],
    photos: [],
  },
}

const tablePostings = ( state = defaults, action ) => {
  let index = ''
  let photos = ''
  switch( action.type ) {
    case 'INDEX_POSTINGS_TABLE':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination
      }
    case 'EMPTY_REDUX_POSTINGS':
      return { ...defaults }
    case 'CLEAR_ACTIVE_POSTING':
      return {
        ...state,
        activePosting: {...defaults.activePosting},
      }
    case 'SHOW_POSTINGS_TABLE':
      return {
        ...state,
        activePosting: action.data
      }
    case 'UPDATE_POSTINGS_TABLE':
      index = state.data.findIndex( posting => {
        return posting.id === action.data.id
      })
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index+1),
        ]
      }
    case 'CREATE_POSTINGS_TABLE':
    case 'UPDATE_POST':
      index = state.data.findIndex( p => p.id === action.data.id )
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          { ...state.data[index], ...action.data },
          ...state.data.slice(index + 1),
        ],
        activePosting: {
          ...state.activePosting,
          ...action.data,
        },
      }
    case 'CREATE_POST':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
        activePosting: {
          ...state.activePosting,
          ...action.data,
        },
      }
    case 'DELETE_POST':
      const filtered = state.data.filter( p => p.id !== action.data )
      return {
        ...state,
        data: [
          ...filtered
        ],
      }
    case 'CREATE_VIDEO':
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          videos: [
            action.data,
            ...state.activePosting.videos,
          ],
        },
      }
    case 'UPDATE_VIDEO':
      index = state.activePosting.videos.findIndex(
        v => v.id === action.data.id
      )
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          videos: [
            ...state.activePosting.videos.slice(0,index),
            action.data,
            ...state.activePosting.videos.slice(index + 1),
          ],
        },
      }
    case 'DELETE_VIDEO':
      const apVideos = state.activePosting.videos.filter(
        v => v.id !== action.data
      )
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          videos: apVideos,
        },
      }
    case 'CREATE_LINK':
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          links: [
            action.data,
            ...state.activePosting.links
          ],
        },
      }
    case 'UPDATE_LINK':
      index = state.activePosting.links.findIndex(
        l => l.id === action.data.id
      )
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          links: [
            ...state.activePosting.links.slice(0,index),
            action.data,
            ...state.activePosting.links.slice(index + 1),
          ],
        },
      }
    case 'DELETE_LINK':
      const links = state.activePosting.links.filter(
        l => l.id !== action.data
      )
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          links: links,
        }
      }
    case 'CREATE_PHOTO':
      photos = state.activePosting.photos
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          photos: [
            action.data,
            ...photos,
          ]
        },
      }
    case 'UPDATE_PHOTO':
      photos = state.activePosting.photos
      index = photos.findIndex( photo => photo.id === action.data.id )
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          photos: [
            ...photos.slice(0, index),
            action.data,
            ...photos.slice(index + 1)
          ]
        }
      }
    case 'DELETE_PHOTO':
      photos = state.activePosting.photos.filter( p => p.id !== action.data )
      return {
        ...state,
        activePosting: {
          ...state.activePosting,
          photos: [
            ...photos,
          ],
        }
      }
    default:
      return state
  }
}

export default tablePostings
