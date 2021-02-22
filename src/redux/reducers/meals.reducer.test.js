import mealsReducer from './meals.reducer'

describe('testing the meals reducer', () => {

    test('action SET_MEALS', () => {
      const initialState = []
      const action = {type: 'SET_MEALS', payload: [{meal1: "meal1"}, {meal2: "meal2"}]}
      expect(mealsReducer(initialState, action)).toEqual([{meal1: "meal1"}, {meal2: "meal2"}]);
    })

    test('action OTHER', () => {
      const initialState = []
      const action = {type: 'OTHER'}
      expect(mealsReducer(initialState, action)).toEqual([]);
    })

})