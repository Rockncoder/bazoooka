/**
 * Created by troymiles on 7/9/16.
 */

(function () {
    console.log("Splash Page");

    let SplashLayer = cc.Layer.extend({
        sprite: null,
        onPlay: function(){
            cc.director.runScene(new myGame.GameScene());
        },
        ctor: function () {
            this._super();

            this.sprite = new cc.Sprite(res.Background_png);
            this.sprite.attr({
                x: cc.winSize.width / 2,
                y: cc.winSize.height / 2
            });
            this.addChild(this.sprite, 0);


            cc.MenuItemFont.setFontSize(60);

            let menuItemPlay = cc.MenuItemSprite.create(
                cc.Sprite.create(res.start_n_png), // normal state image
                cc.Sprite.create(res.start_s_png), //select state image
                this.onPlay, this);
            let menu = cc.Menu.create(menuItemPlay);  //7. create the menu
            menu.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
            this.addChild(menu);

            return true;
        }
    });


    myGame.SplashScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            this.addChild(new SplashLayer());
        }
    });
}());