import userReducer from './user.reducer'

describe('testing the user reducer', () => {

    test('action SET_USER', () => {
      const initialState = {username: 'test'}
      const action = {type: 'SET_USER', payload: 'user'}
      expect(userReducer(initialState, action)).toEqual("user");
    })

    test('action UNSET_USER', () => {
      const initialState = {username: 'test'}
      const action = {type: 'UNSET_USER'}
      expect(userReducer(initialState, action)).toEqual({});
    })

    test('action OTHER_ACTION', () => {
      const initialState = {}
      const action = {type: 'USER'}
      expect(userReducer(initialState, action)).toEqual(initialState);
    })

})