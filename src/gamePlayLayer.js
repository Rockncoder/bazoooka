/**
 * Created by troymiles on 7/9/16.
 */

(function () {
    "use strict";

    let enemies = [];
    let enemyBullets = [];
    let hero = null;
    let gameOver = false;
    let score = 0;

    myGame.GamePlayLayer = cc.Layer.extend({
        update: function (dt) {
            let enemiesToDelete = [];
            let enemyBulletsToDelete = [];

            enemies.forEach(function (enemy) {
                enemy.update(dt);
            });

            enemyBullets.forEach((enemy)=> enemy.update(dt));

            for (let bullet of enemyBullets) {
                if (myGame.checkBoxCollision(bullet, hero)) {
                    enemyBulletsToDelete.push(bullet);
                    gameOver = true;
                    console.log("Hit Player");
                    break;
                }
            }

            enemyBullets = enemyBullets.filter(function (bullet) {
                let result = enemyBulletsToDelete.find(function (b) {
                    let foundIt = (b === bullet);
                    if (foundIt) {
                        b.getParent().removeChild(b, false);
                    }
                    return foundIt;
                });
                return !result;
            });

        },
        ctor: function (_hero) {
            this._super();
            hero = _hero;
            return true;
        }
    });

    myGame.checkBoxCollision = function (sprite1, sprite2) {
        const box1 = sprite1.getBoundingBox();
        const box2 = sprite2.getBoundingBox();
        return cc.rectIntersectsRect(box1, box2);
    };

    myGame.getEnemiesArray = function () {
        return enemies;
    };

    myGame.getEnemyBulletArray = function () {
        return enemyBullets;
    };

    myGame.isGameOver = function () {
        return gameOver;
    };

    myGame.getScore = function () {
        return score;
    };

}());