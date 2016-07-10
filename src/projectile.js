/**
 * Created by troymiles on 7/9/16.
 */

(function () {
    "use strict";

    myGame.Projectile = cc.Sprite.extend({
        type: 0,
        init: function (position, _type) {
            this.type = _type;
            if (this.type === 1) {
                this.setTexture(res.bullet_png);
            } else if (this.type === 2) {
                this.setTexture(res.rocket_png);
            }
            this.setPosition(position);
            return true;
        },
        update: function () {
            let pos = this.getPosition();
            let offsetX = 0;
            switch (this.type) {
                case 1:
                    offsetX = -7;
                    break;
                case 2:
                    offsetX = 7;
                    break;
                default:
                    break;
            }
            this.setPosition(pos.x + offsetX, pos.y);
        }
    });

    myGame.Projectile.create = function (pos, type) {
        let projectile = new myGame.Projectile();
        projectile.init(pos, type);
        return projectile;
    };
}());