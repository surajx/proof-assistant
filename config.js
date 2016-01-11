module.exports = {
  db: process.env.db || 'localhost',
  session : {
    secret: process.env.session_secret || '9efaae083bc9dd0904566988c4b5b9 \
      45bf6cbeb58c9e6737b369319ab0a5fd19'
  }
};
