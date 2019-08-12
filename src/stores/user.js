import { derived } from 'svelte/store';
import userData from '../data/user';
import { signIn, signOut } from '../data/auth';

const user = derived(userData, ($user, set) => {
  if ($user) {
    set({ id: $user.id, ...$user.data() });
  } else {
    set(null);
  }
});

export default user;

export function signin(email, password, onFail) {
  signIn(email, password, onFail);
}

export function signout() {
  signOut();
}
