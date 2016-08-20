angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function () {
      this.hello = 'Hello World!';
    }
  });
