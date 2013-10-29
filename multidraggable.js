/**
 * Written by Tikhonov Alexey MultiDraggable for jsPlumb nodes
 *
 * Fork of JQuery MultiDraggable Plugin  (https://github.com/someshwara/MultiDraggable)
 *
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 **/

(function ($, undefined) {
  $.fn.multiDraggable = function (opts) {
    var initLeftOffset = []
      , initTopOffset = [];
    return this.each(function (n, el) {
      el = '#'+el;
      if (!$(el).data("init")) {
        $(el).data("init", true).draggable(opts, {
          start: function (event, ui) {
            var item = $(el);
            var pos = item.position();
            var items = $(opts.group);
            $.each(items || {}, function (key, value) {
              var elemPos = $('#' + value).position();
              initLeftOffset[key] = elemPos.left - pos.left;
              initTopOffset[key] = elemPos.top - pos.top;
            });
            opts.startNative ? opts.startNative() : {};
            jsPlumb.repaint(items);
            jsPlumb.repaint(item);
          },
          drag: function (event, ui) {
            var item = $(el);
            var pos = ui.offset;
            var items = $(opts.group);
            $.each(items || {}, function (key, value) {

              var oPos = {
                left: pos.left + initLeftOffset[key],
                top: pos.top + initTopOffset[key]
              }, oEl = $('#' + value);

              oEl.offset(oPos);
              jsPlumb.repaint(oEl, oPos);
            });

            jsPlumb.repaint(item, pos);
            opts.dragNative ? opts.dragNative() : {};
          },
          stop: function (event, ui) {
            var item = $(el);
            var pos = $(el).offset();
            var items = $(opts.group);
            //         console.log("stop",ui,event)
            $.each(items || {}, function (key, value) {
              $('#' + value).offset({
                left: pos.left + initLeftOffset[key],
                top: pos.top + initTopOffset[key]
              });
            });
            opts.stopNative ? opts.stopNative() : {};
            jsPlumb.repaint(items);
          }
        });
      }
    });
  };
}(jQuery));
