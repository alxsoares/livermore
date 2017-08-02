/*
* General confs.
*/


module.exports = {
    package_root_path: process.env.PACKAGE_ROOT_PATH,
    env: {
        name: process.env.ENV || 'dev'
    },
    exchanges: ['bitstamp']
}
