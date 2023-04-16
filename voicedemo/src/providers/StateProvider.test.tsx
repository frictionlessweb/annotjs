import { reduce, DEFAULT_APP_STATE } from './StateProvider';

describe("Our state provider", () => {
  test("Can start loading", () => {
    const res = reduce(DEFAULT_APP_STATE, { type: 'START_LOADING' });
    expect(res.isLoading).toBe(true);
  })
  test("Can stop loading", () => {
    const isLoading = reduce(DEFAULT_APP_STATE, { type: 'START_LOADING' });
    expect(isLoading.isLoading).toBe(true);
    const isNotLoading = reduce(isLoading, { type: 'STOP_LOADING' });
    expect(isNotLoading.isLoading).toBe(false);
  })
  test("Can add a message from the API and stop loading", () => {
    const isLoading = reduce(DEFAULT_APP_STATE, { type: 'START_LOADING' });
    expect(isLoading.isLoading).toBe(true);
    const message = { text: 'test', type: 'system' } as const;
    const hasMessage = reduce(isLoading, { type: 'ADD_MESSAGE', payload: message })
    expect(hasMessage.isLoading).toBe(false);
    expect(hasMessage.messages[0]).toEqual(message);
  })
  test("Can add a message from the user and start loading", () => {
    const message = { text: 'test', type: 'user' } as const;
    const hasMessage = reduce(DEFAULT_APP_STATE, { type: 'ADD_MESSAGE', payload: message })
    expect(hasMessage.isLoading).toBe(true);
    expect(hasMessage.messages[0]).toEqual(message);
  })
})
