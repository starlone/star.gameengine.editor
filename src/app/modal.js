(function () {
  angular
    .module('app')
    .factory('$semodal', function ($compile) {
      function show(scope, content) {
        $('se-modal').remove();
        var modal = $('<se-modal />');
        modal.html(content);

        $('ui-view').append(modal);
        $compile(modal)(scope);
      }

      function hide() {
        $('se-modal .close').click();
        $('se-modal .modal').on('hidden.bs.modal', function () {
          $('se-modal').remove();
        });
      }

      return {
        show: show,
        hide: hide
      };
    })
    .component('seModal', {
      templateUrl: 'app/modal.html',
      transclude: true,
      controller: function () {
        var modal = $('se-modal > div');
        modal.modal();
      }
    });
})();
