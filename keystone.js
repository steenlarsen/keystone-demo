var keystone = require('keystone');


    //  Steen Larsen : Openshift adaption
var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
	mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
	mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
	mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
	mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
	mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
	mongoURLLabel = mongoURL = 'mongodb://';
	if (mongoUser && mongoPassword) {
	    mongoURL += mongoUser + ':' + mongoPassword + '@';
	}
	mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

    }
}
// console.log("Hello : " + mongoURL);
// SL END

keystone.init({

	'name': 'Keystone Demo',
	'brand': 'Demo',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

        /* 
	   * Steen Larsen, wanted to add the next two lines for Openshift but similar code is already present in ./node_modules/keystone/index.js
	   * 'port' : process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
	   * 'ip' :   process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
	   */
         'mongo': mongoURL, // SL: adapted

	'views': 'templates/views',
	'view engine': 'pug',

        'auto update': true,
	'cloudinary config': 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN

});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'posts': ['posts', 'post-comments', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users',
	'field-tests': 'things'
});

keystone.start();
