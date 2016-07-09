/**
 * Created by troymiles on 7/9/16.
 */

(function () {
    "use strict";

    let enemies = [];
    let enemiesBullets = [];
    let hero = null;


    myGame.GamePlayLayer = cc.Layer.extend({
        update: function(dt){
            let enemiesToDelete = [];
            let enemyBulletsToDelete = [];

            enemies.forEach(function(enemy){
                enemy.update(dt);
            });
        },
        ctor: function(_hero){
            this._super();
            hero = _hero;
            return true;
        }
    });

    myGame.getEnemiesArray = function(){
        return enemies;
    };

}());