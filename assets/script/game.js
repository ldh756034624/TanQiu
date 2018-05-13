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
        socreCom:{
            default:null,
            type:cc.Label
        },
        playBtn:{
            default:null,
            type:cc.Node
        },
        socre:0
    },


    displayScore:function(){
        this.socreCom.string = "socre : "+this.socre
    },
    addScore:function(){
        this.socre ++
    },
   
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
        var game = this.getComponent("game")
        console.log("width : "+this.node.width)
        var bord  = this.node.getChildByName("bord");
        console.log("bord : "+bord)
        Global.screenW = this.node.width
        Global.screenH = this.node.height
        console.log("screenW : "+Global.screenW)
        console.log("screenH : "+Global.screenH)
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDrawBoundingBox = true;
        // manager.enabledDebugDraw = true;
        // this.socreCom.string = "12"
        this.playBtn.active = false
        
        this.playBtn.on("mousedown",function(event){
            cc.director.loadScene("game");
        })
    },



    update (dt) {

        this.socreCom.string = "socre : "+this.socre
    },
});
