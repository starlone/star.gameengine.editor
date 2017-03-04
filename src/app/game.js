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
        var terrain = new se.GameObject('Terrain', 1000, 250);
        scene.add(terrain);
        var ground = se.factory.rect({name: 'Ground', x: 0, y: 0, w: 3800, h: 30, fillColor: 'green', isStatic: true});
        terrain.addChild(ground);
      }
      game.addScene(scene);
      game.run();
      var renderOld = null;
      var rendererSelected = new se.MeshRenderer('#ffb74d', '#e65100', 5);

      var rendererEdit = new se.EditRenderer('#ffb74d', '#e65100', 5, 'blue');

      function setSelected(obj) {
        if (obj === this.selected) {
          return;
        }
        if (renderOld) {
          this.selected.setRenderer(renderOld);
        }
        if (this.drawInteraction) {
          game.viewport.removeInteraction(this.drawInteraction);
          game.viewport.activeInteractions();
        }
        this.selected = null;
        renderOld = null;

        if (obj) {
          this.selected = obj;
          renderOld = obj.getRenderer();
          if (renderOld) {
            obj.setRenderer(rendererSelected);
          }
        }
      }

      function setEditable() {
        if (this.selected) {
          if (renderOld) {
            this.selected.setRenderer(rendererEdit);
          }
        }
      }

      function deleteSelected() {
        this.selected.destroy();
      }

      function setDraw() {
        game.viewport.desactiveInteractions();
        this.drawInteraction = new se.DrawInteraction(this.selected);
        game.viewport.addInteraction(this.drawInteraction);

        this.selected.setRenderer(rendererEdit);
      }

      return {
        game: game,
        gamePlay: null,
        selected: null,
        isPlaying: false,
        setSelected: setSelected,
        setEditable: setEditable,
        setDraw: setDraw,
        deleteSelected: deleteSelected,
        drawInteraction: null
      };
    });
})();
