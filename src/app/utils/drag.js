(function () {
  angular
    .module('app')
    .directive('seDrag', function () {
      return function (scope, element) {
        // this gives us the native JS object
        var el = element[0];
        // el.draggable = true;

        el.addEventListener('dragstart', function (e) {
          if (this.draggable) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('objid', this.id.slice(4));
            this.classList.add('drag');
          }

          return false;
        }, false);

        el.addEventListener('dragend', function () {
          this.classList.remove('drag');
          return false;
        }, false);
      };
    })
    .directive('seDrop', function ($managegame) {
      return {
        scope: {},
        link: function (scope, element) {
          var scene = $managegame.game.getSceneCurrent();

          // again we need the native object
          var el = element[0];
          el.addEventListener('dragover', function (e) {
            e.dataTransfer.dropEffect = 'move';
            // allows us to drop
            if (e.preventDefault) {
              e.preventDefault();
            }
            this.classList.add('dragover');
            return false;
          }, false);

          el.addEventListener('dragenter', function () {
            this.classList.add('dragover');
            return false;
          }, false);

          el.addEventListener('dragleave', function () {
            this.classList.remove('dragover');
            return false;
          }, false);

          el.addEventListener('drop', function (e) {
            // Stops some browsers from redirecting.
            if (e.stopPropagation) {
              e.stopPropagation();
            }

            this.classList.remove('dragover');

            var id = e.dataTransfer.getData('objid');
            var idt = this.id.slice(4);

            if (id !== idt) {
              var obj = scene.indexObjs[id];
              var target = scene.indexObjs[idt];

              obj.getParent().remove(obj);
              target.addChild(obj);
            }

            scope.$apply();

            return false;
          }, false);
        }
      };
    });
})();
