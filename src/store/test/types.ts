export interface Test {
  name: string;
}

export interface TestState {
  test: Test | null;
  loading: boolean;
  error: string | null;
}

export const TEST_REQUEST = 'TEST_REQUEST';
export const TEST_SUCCESS = 'TEST_SUCCESS';
export const TEST_FAILURE = 'TEST_FAILURE';


export interface TestRequestAction {
  type: typeof TEST_REQUEST;
}

export interface TestSuccessAction {
  type: typeof TEST_SUCCESS;
  test: Test;
}

export interface TestFailureAction {
  type: typeof TEST_FAILURE;
  error: string;
}


export type TestAction =
  TestRequestAction |
  TestSuccessAction |
  TestFailureAction;
