exports.DATABASE_URL = 'mongodb://test:test@ds053166.mlab.com:53166/testshoppinglist' 
// process.env.DATABASE_URL || 
//                        global.DATABASE_URL || 'mongodb://test:test@ds053166.mlab.com:53166/testshoppinglist' ||
//                        (process.env.NODE_ENV === 'production' ?
//                             'mongodb://localhost/shopping-list' :
//                             'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;

