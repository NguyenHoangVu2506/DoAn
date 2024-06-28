import { Action } from '../actions'

const initialState = {
    new_contact: null

}

const ContactReducer = (state = initialState, action) => {

    switch (action.type) {
     
        case Action.NEW_CONTACT:
            return {
                ...state,
                new_contact: action.payload.metaData
            }
        default:
            return state;
    }
}

export default ContactReducer