class GetAllPlayingFields{
    constructor(idx) {
        this.idx = idx;
      }

      getFields() {
        return Array(50).fill({ idRoom: this.idx, result: null })
      }
}

module.exports = GetAllPlayingFields