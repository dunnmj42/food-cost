import detailsReducer from './details.reducer'

describe('testing the details reducer', () => {

    test('action SET_MEAL_DETAILS', () => {
      const initialState = []
      const action = {type: 'SET_MEAL_DETAILS', payload: [{meal1: "meal1"}]}
      expect(detailsReducer(initialState, action)).toEqual([{meal1: "meal1"}]);
    })

    test('action OTHER', () => {
      const initialState = []
      const action = {type: 'OTHER'}
      expect(detailsReducer(initialState, action)).toEqual([]);
    })

})