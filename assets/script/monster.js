// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        speedX:0,
        speeDY:0,
        acceleration:0,
        audio: {
            url: cc.AudioClip,
            default: null
        },
        game:{
            default:null,
            type:cc.Node
        }
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speedX = 4
        this.speedY = 4

        cc.game.addPersistRootNode(this.node);
    },

    start () {

    },
    
   

    update (dt) {
        
        if( this.isLeftMax() || this.isRightMax()){
            this.speedX = -this.speedX
            this.acceleration = -this.acceleration
        }
       
        if( this.isTopMax() ){
            this.speedY = -this.speedY
            this.acceleration = -this.acceleration
        }
        
        if(this.isDownMax()){
            var gamejs = this.game.node.getComponent("game")
            gamejs.playBtn.active = true
            // cc.director.loadScene("game");
        }

        this.node.x =this.node.x - this.speedX - this.acceleration
        this.node.y =this.node.y -  this.speedY - this.acceleration
    },

    //判断是否到达最边
    isLeftMax:function(){
        var newX = this.node.x - this.speedX
        return  newX < -Global.screenW / 2 
    },
    //最下边
    isDownMax:function(){
        var newY = this.node.y - this.speedY
        return newY < -Global.screenH / 2 
    },
    //最右边
    isRightMax:function(){
        var newX = this.node.x - this.speedX
        return newX > Global.screenW / 2
    },
    //最上边
    isTopMax: function(){
        var newY = this.node.y - this.speedY
        return newY > Global.screenH / 2
    },
    onCollisionEnter:function(other, self){

        this.current = cc.audioEngine.play(this.audio, false, 1);
        console.log('on collision enter: ' + other +" , "+self);
        this.speedY = -this.speedY
        // this.acceleration += 1
        var gamejs = this.game.node.getComponent("game")
        console.log("gamejs "+gamejs)
        gamejs.addScore()
    }
});
