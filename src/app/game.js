(function () {
  angular
    .module('app')
    .factory('$managegame', function ($localStorage) {
      var game = new se.StarEngine();
      game.runner.enabled = false;
      var scene;
      if ($localStorage.save) {
        var json = $localStorage.save;
        json = JSON.parse(json);
        scene = se.load.scene(json);
      } else {
        scene = new se.Scene(new se.GradientRenderer('#004CB3', '#8ED6FF'));
        var ground = se.factory.rect({name: 'Ground', x: 1000, y: 250, w: 3800, h: 30, fillColor: 'green', rigidopts: {isStatic: true}});
        scene.add(ground);
      }
      game.addScene(scene);
      game.run();
      var renderOld = null;
      var renderer = new se.MeshRenderer('#ffb74d', '#e65100', 5);

      function setSelected(obj) {
        if (renderOld) {
          this.selected.setRenderer(renderOld);
        }
        this.selected = null;
        renderOld = null;
        if (obj) {
          this.selected = obj;
          renderOld = obj.getRenderer();
          if (renderOld) {
            obj.setRenderer(renderer);
          }
        }
      }

      function deleteSelected() {
        this.selected.destroy();
      }

      return {
        game: game,
        gamePlay: null,
        selected: null,
        isPlaying: false,
        setSelected: setSelected,
        deleteSelected: deleteSelected
      };
    });
})();
