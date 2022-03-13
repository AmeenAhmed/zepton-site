
export default {
  push(path) {
    window.history.pushState({}, null, path);
  }
}
