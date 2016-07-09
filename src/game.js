/**
 * Created by troymiles on 7/9/16.
 */

(function () {
    "use strict";

    let hero = null;
    let leftButton, rightButton;
    let jumpTimer = 0;
    let jumping = false;
    let gravity = {x: 0, y: -5};
    let distFraction = null;
    let gamePlayLayer = null;

    let GameLayer = cc.Layer.extend({
        sprite: null,
        spawnEnemy: function (dt) {
            console.log("spawnEnemy");
            let enemy = myGame.Enemy.createEnemy(gamePlayLayer);
            gamePlayLayer.addChild(enemy);
            myGame.getEnemiesArray().push(enemy);
            //console.log("Enemies = " + myGame.getEnemiesArray().length);
        },

        update: function (dt) {

            let midPointY = hero.getContentSize().height / 2;
            let maxY = cc.winSize.height - midPointY;
            let minY = midPointY;
            let disStep = (distFraction * dt);
            let newY = hero.getPosition().y + disStep;
            newY = Math.min(Math.max(newY, minY), maxY);
            hero.setPosition({x: hero.getPosition().x, y: newY});

            if (jumping) {
                jumping = false;
                jumpTimer = 10;
            }

            if (jumpTimer > 0) {
                jumpTimer--;
                let p = hero.getPosition();
                hero.setPosition(p.x, p.y + 7);
            } else {
                jumpTimer = 0;
                let p = hero.getPosition();
                hero.setPosition(p.x, p.y + gravity.y);
            }

            gamePlayLayer.update(dt);
        },
        ctor: function () {
            this._super();

            this.sprite = new cc.Sprite(res.Background_png);
            this.sprite.attr({
                x: cc.winSize.width / 2,
                y: cc.winSize.height / 2
            });
            this.addChild(this.sprite, 0);

            // the heroine
            hero = new cc.Sprite(res.tinyBazooka_png);
            hero.attr({
                x: cc.winSize.width * 0.25,
                y: cc.winSize.height * 0.50
            });
            this.addChild(hero, 5);

            gamePlayLayer = new myGame.GamePlayLayer(hero);
            this.addChild(gamePlayLayer);

            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: this.didAccelerate
            }, this);

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouch: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
            }, this);

            leftButton = cc.rect(0, 0, cc.winSize.width / 2, cc.winSize.height);
            rightButton = cc.rect(cc.winSize.width / 2, 0, cc.winSize.width, cc.winSize.height);

            this.scheduleUpdate();
            cc.director.getScheduler().scheduleCallbackForTarget(this, this.spawnEnemy, 3, cc.REPEAT_FOREVER, 0, false);

            return true;
        },
        didAccelerate: function (pAccelerationValue, event) {
            distFraction = cc.winSize.height * pAccelerationValue.x;
        },
        onTouchBegan: function (touch, event) {
            console.log("onTouchBegan");
            let location = touch.getLocationInView();
            location = cc.director.convertToGL(location);

            if (cc.rectContainsPoint(rightButton, location)) {
                console.log("FIRE!");
            }

            if (cc.rectContainsPoint(leftButton, location)) {
                console.log("JUMP!!!");
                jumping = true;
            }
            return true;
        },
        onTouchMoved: function (touch, event) {
            console.log("onTouchMoved");
        },
        onTouchEnded: function (touch, event) {
            console.log("onTouchEnded");
        }
    });

    myGame.GameScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            this.addChild(new GameLayer());
        }
    });
}());