module.exports = {
  sleep: function(ms) {
    return new Promise(function(r) {
      setTimeout(r, ms);
    })
  }
}
