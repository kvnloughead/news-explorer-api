module.exports.MONGO_SERVER_ADDRESS = 'mongodb://127.0.0.1:27017/articlesdb';
module.exports.DEV_KEY = 'dev-secret';

module.exports.ERROR_MESSAGES = {
  unauthorized: 'Authorization Required',
  ownedArticlesOnly: 'Authorization required.  You can only delete your own articles.',
  interalServer: 'An error has occured on the server.',
  articleBadRequest: 'Data validation failed:  article cannot be created.',
  articleNotFound: 'Article not found.',
  userNotFound: 'User not found',
  emailNotUnique: 'That email is already in use.',
  userBadRequest: 'Data validation failed:  user cannot be created.',
  badCredentials: 'Incorrect password or email.',
};
