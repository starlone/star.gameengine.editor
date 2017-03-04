angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function ($scope, $managegame, $localStorage, $semodal) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.manage = $managegame;

      vm.scene = vm.game.getSceneCurrent();

      vm.save = function () {
        $managegame.setSelected();
        var json = JSON.stringify(vm.game.getSceneCurrent().json());
        $localStorage.save = json;
      };

      vm.clear = function () {
        $localStorage.save = null;
        window.location.reload();
      };

      vm.export = function () {
        $managegame.setSelected();
        var json = JSON.stringify(vm.game.getSceneCurrent().json());
        var blob = new Blob([json], {type: 'application/json;charset=utf-8'});
        saveAs(blob, 'scene.json');
      };

      vm.import = function () {
        $managegame.setSelected();
        $semodal.show(vm, '<se-import />');
      };

      vm.resize = function () {
        if (window.innerWidth > 768) {
          $('.sidebar').addClass('sidebar-open');
        } else {
          $('.sidebar').removeClass('sidebar-open');
        }
      };
      vm.closePanels = function () {
        $('.sidebar').sidebar('hide');
      };

      vm.resize();
    }
  });
