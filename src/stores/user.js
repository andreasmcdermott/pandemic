import { derived } from 'svelte/store';
import userData from '../data/user';
import { signIn, signOut } from '../data/auth';

const user = derived(
  userData,
  ($user, set) => {
    if ($user && $user.id) {
      set({ id: $user.id, ...$user.data() });
    } else if ($user) {
      set({ id: null });
    } else {
      set(null);
    }
  },
  null
);

export default user;

export function signin(email, password, onFail) {
  signIn(email, password, onFail);
}

export function signout() {
  signOut();
}
