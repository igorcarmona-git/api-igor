const setDatabank = (ambient) => {
    switch (ambient) {
        case 'production':
            return '../../src/infra/data/production-database.sqlite';
        case 'test':
            return '../../src/infra/data/test-database.sqlite';
        default:
            return '../../src/infra/data/database.sqlite';
    }
}

module.exports =  setDatabank