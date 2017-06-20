module.exports = function(deployTarget) {

  var ENV = {
    build: {
      environment: deployTarget
    },
    'revision-data': {
      type: 'git-commit'
    },
    'ssh-index': {
      remoteDir: "/usr/local/www/myapp",
      username: "www",
      host: "192.168.0.136",
      privateKeyFile: "/Users/me/.ssh/id_rsa",
      allowOverwrite: true
    },
    rsync: {
      dest: "/usr/local/www/myapp",
      username: "www",
      host: "192.168.0.136",
      delete: false
    }
  };

  return ENV;

};
