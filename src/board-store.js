import { writable } from 'svelte/store';

const board = writable({ x: 0, y: 0, showOverlay: true });

export default board;

export function toggleOverlay() {
  board.update(vals => {
    vals.showOverlay = !vals.showOverlay;
    return vals;
  });
}
