angular
  .module('app')
  .component('sePanel', {
    transclude: true,
    templateUrl: 'app/panel.html',
    bindings: {
      title: '@'
    }
  });
