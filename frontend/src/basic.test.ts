import {expect, test} from 'vitest'
import rootStore from "./stores";

const { globalStore } = rootStore;

test('setAlert should set the alert', () => {
  globalStore.setAlert({ status: 'info', message: 'Hello World' });

  const alert = globalStore.getAlert();

  expect(alert).toEqual({ status: 'info', message: 'Hello World' });
});