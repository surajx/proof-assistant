module.exports = {
  db: process.env.PROOF_MONGODB || 'localhost',
  session : {
    secret: process.env.PROOF_SESSION_SECRET || '9efaae083bc9dd0904566988c4b5b9 \
      45bf6cbeb58c9e6737b369319ab0a5fd19'
  },
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || '6LdqglcUAAAAABbiAE6F_5cJD1cscFDSV7UUOMO4',//6Lc5VzQUAAAAAPfATvrGumvCp6XHNnNvPKRAsmf0
    secretKey: process.env.RECAPTCHA_SITE_SECRET || '6LdqglcUAAAAAEIg-iLb083-LKfzkVAoBa5O10EP'//,siteSecret
  }
};
