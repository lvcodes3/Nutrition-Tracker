const isEmpty = (v) => {
    if (v === undefined || v === null) {
        return true;
    }
    if (typeof(v) === 'string' && v.trim() === '') {
        return true;
    }
    return false;
}

module.exports = {
    isEmpty
};