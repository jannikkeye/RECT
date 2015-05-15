function CanvasView(root, width, height) {

    var self = this;

    self.width = width;
    self.height = height;
    self.views = [];
    self.loopFunction = null;
    self.ownerDocument = root.ownerDocument;

    self.canvas = self.ownerDocument.createElement('canvas');
    self.canvas.height = height;
    self.canvas.width = width;
    self.canvas.style.width = width + 'px';
    self.canvas.style.height = height + 'px';
    self.canvas.style.backgroundColor = '#FFF8F5';
    root.appendChild(self.canvas);

    self.context = self.canvas.getContext('2d');

    self.addObjectView = function (object, color) {
        self.views.push({
            color: color,
            object: object
        });
    };

    self.destroy = function () {
        clearTimeout(self.currentTimeout);
        console.log("DESTROYED VIEW");
    };

    self.render = function () {
        self.context.clearRect(0, 0, self.width, self.height);
        self.views.forEach(function (view) {
            self.context.fillStyle = view.color;
            self.context.fillRect(view.object.x, view.object.y, view.object.width, view.object.height);
        });
    };

    self.renderRepeatedly = function () {
        self.render();
    };
    self.loopFunction = setInterval(self.renderRepeatedly, 10);

}