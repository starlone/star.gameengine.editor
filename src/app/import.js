angular
  .module('app')
  .component('seImport', {
    templateUrl: 'app/import.html',
    controller: function ($scope, $managegame, $compile) {
      var vm = $scope;
      vm.sejson = '';
      var modal = $('se-import > div');
      modal.modal();

      $('se-import input[type=file]').on('change', function (e) {
        var files = e.target.files;
        var reader = new FileReader();
        var file = files[0];
        reader.onload = function () {
          vm.sejson = this.result;
          vm.$apply();
        };
        reader.readAsBinaryString(file);
      });

      vm.fileimport = function () {
        var json = JSON.parse(vm.sejson);
        var scene = se.load.scene(json);
        $managegame.game.scenes[0] = scene;
        $managegame.scene = scene;
        modal.modal('hide');
        var div = $('se-panelproject').html('');
        $compile(div)($scope);
      };
    }
  });
