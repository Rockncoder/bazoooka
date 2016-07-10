/**
 * Created by troymiles on 7/9/16.
 */

(function () {
    "use strict";


    let gamePlayLayer = null;

    myGame.Enemy = cc.Sprite.extend({
        ctor: function () {
            this._super();
        },
        shoot: function (dt) {
            let pos = this.getPosition();
            let content = this.getContentSize();
            pos.x -= (content.width / 2 );
            pos.y -= (content.height * 0.05);
            let pr = myGame.Projectile.create(pos, 1);
            gamePlayLayer.addChild(pr);
            myGame.getEnemyBulletArray().push(pr);
        },
        initEnemy: function (gp) {
            gamePlayLayer = gp;
            this.setTexture(res.enemy_png);
            let pos = {
                x: cc.winSize.width + this.getContentSize().width / 2,
                y: cc.winSize.height * myGame.random(0, 3) * 0.25
            };
            this.setPosition(pos);
            return true;
        },
        update: function () {
            let pos = this.getPosition();
            this.setPosition(pos.x - 3, pos.y);
        }
    });

    myGame.Enemy.createEnemy = function (gp) {
        let enemy = new myGame.Enemy();
        enemy.initEnemy(gp);
        enemy.shoot(0.016);
        return enemy;
    }
}());