const HASH_UNDEFINED = '__musee_hash_undefined__'


/**
 * create  a Hash Object
 */
class Hash {
    constructor(entries) {
        let index = -1
        const length = entries == null ? 0 : entries.length
        this.clear()
        while (++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }

    clear() {
        this.__data__ = Object.create(null)
        this.size = 0
    }

    has(key) {
        const data = this.__data__
        return data[key] !== undefined
    }

    set(key, value) {
        const data = this.__data__
        this.size += this.has(key) ? 0 : 1
        data[key] = value === undefined ? HASH_UNDEFINED : value
        return this
    }
}


export default Hash

