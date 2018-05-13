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
        xSpeed:400,
        accLeft:false,
        accRight:false,

        canvas: {
            default: null,
            type: cc.Node
        },
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("onLoad........")
        this.setInputControl()
        console.log("onLoad........end")
        this.accLeft = false;
        this.accRight = false;
    },

    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event){
            switch(event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = true;
                    console.log("press a")
                    break;
                case cc.KEY.d:
                    console.log("press d")
                    self.accRight = true;
                    break;
            }
        });

        // 松开按键时，停止向该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event){
            switch(event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.KEY.d:
                    self.accRight = false;
                    break;
            }
        });
        
        this.node.on(cc.Node.EventType.MOUSE_DOWN,function(){
            console.log("mouseDown....")
        })

        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            console.log("touchstart")
        })
    },

    start () {

    },

    update (dt) {
         if(this.accRight){
             this.node.x += this.xSpeed ;
         }else if(this.accLeft){
            this.node.x -= this.xSpeed ;
         }
    }


});
