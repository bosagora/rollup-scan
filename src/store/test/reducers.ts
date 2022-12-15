import { AppAction } from '..';
import { TestState, TEST_FAILURE, TEST_REQUEST, TEST_SUCCESS } from './types';

const initialState: TestState = {
  test: null,
  loading: false,
  error: null,
};

export function testReducer(
  state = initialState,
  action: AppAction
): TestState {
  switch (action.type) {
    case TEST_REQUEST: return {
      ...state,
      loading: true
    };

    case TEST_FAILURE: return {
      ...state,
      loading: false,
      error: action.error
    };

    case TEST_SUCCESS: return {
      ...state,
      loading: false,
      test: action.test,
      error: null
    };

    default: return state;
  }
}