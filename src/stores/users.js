import { derived } from 'svelte/store';
import usersData from '../data/users';

const users = derived(
  usersData,
  ($users, set) => {
    if ($users) {
      set($users.docs.map(user => ({ id: user.id, ...user.data() })));
    } else {
      set([]);
    }
  },
  []
);

export default users;
