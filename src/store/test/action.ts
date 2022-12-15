import { TestAction, TEST_FAILURE, TEST_REQUEST, TEST_SUCCESS, Test } from './types';

export function testRequest(): TestAction {
  return {
    type: TEST_REQUEST
  };
}

export function testSuccess(test: Test): TestAction {
  return {
    type: TEST_SUCCESS,
    test
  };
}

export function testFailure(error: string): TestAction {
  return {
    type: TEST_FAILURE,
    error
  };
}
