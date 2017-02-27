angular
  .module('app')
  .component('seImport', {
    templateUrl: 'app/modals/import.html',
    controller: function ($scope, $managegame, $compile, $semodal) {
      var vm = $scope;
      vm.sejson = '';

      $('se-import input[type=file]').on('change', function (e) {
        var files = e.target.files;
        var reader = new FileReader();
        var file = files[0];
        reader.onload = function () {
          vm.sejson = this.result;
          vm.$apply();
        };
        reader.readAsText(file);
      });

      vm.fileimport = function () {
        var json = JSON.parse(vm.sejson);
        var scene = se.load.scene(json);
        $managegame.game.scenes[0] = scene;
        $managegame.scene = scene;
        var div = $('se-panelproject').html('');
        $compile(div)($scope);
        $semodal.hide();
      };
    }
  });
