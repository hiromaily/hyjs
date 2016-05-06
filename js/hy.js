//*--------------------------------------------------------------------------*//
//* hyjs */
//* used easel.js and tween.js created by Adobe.Inc
//*--------------------------------------------------------------------------*//
(function(){
    var hy = function(){};
    //public
    hy.debug = 1;

    //private
    var stage_w_;
    var stage_h_;
    
    var canvas_;
    var stage_;
    var ctx_;
    var h_obj_       = [new Container(), new Container(), new Container()];
    var y_obj_       = [new Container(), new Container(), new Container()];
    var outline_obj_ = [new Container(), new Container(), new Container()];
    var hy_obj_      = [new Container(), new Container(), new Container()];
    
    var hy_bmp_;
    var fps_txt_;
    var bmp_anim_;
    
    //var color_      = Math.random() * 255 << 8;
    var color_      = "#33ff33";
    var block_size_ = 16;
    var anim_scene_ = 0;
    var count1_ = 0;
    var count2_ = 0;
    var count3_ = 0;
    var count4_ = 0;
    var loop_ = 0;
    var text_data_ = ["H","T","M","L","5","A","N","I","M","A","T","I","O","N"];
    
    var pai_ = Math.PI/180;    
//------------------------------------------------------------------------------
// private
//------------------------------------------------------------------------------
    //----------------------------
    // check Android
    //----------------------------
    var checkAndroid = function(){
      //Android Version
      var ua = navigator.userAgent.match(/android (\d+\.\d+)/i);
      var os = (!!ua)? ua[1]:0;
      
      return {
        version: os,
        devicePixelRatio: window.devicePixelRatio //As majority, 1.5 or 2 on Android
      };
    };
    var isAndroid_      = checkAndroid();

    //----------------------------
    // check iOS
    //----------------------------
    var checkiOS = function(){
      //iOS Version
      var ua = navigator.userAgent;
      var os = ua.match(/iPhone OS (\d+\_\d+\_\d+)/i) || ua.match(/iPhone OS (\d+\_\d+)/i);
      if(!os) os = ua.match(/iPad; CPU OS (\d+\_\d+\_\d+)/i) || ua.match(/iPad; CPU OS (\d+\_\d+)/i);
      os = (!!os)? os[1].replace(/_/g,"."):0;

      return {
        version: os,
        devicePixelRatio: window.devicePixelRatio //iOS5 is2, iOS4 is 1
      };
    };
    var isiPhone_       = checkiOS();

    //----------------------------
    // createH
    //----------------------------
    var createH = function(obj,color){

      var block_start_x = block_size_ * 2;
      var block_start_y = block_size_ * 2;

      //g.graphics.beginFill(Math.random() * 255 << 8);
      var shape = new Shape();
      shape.graphics.beginFill(color)
                    .lineTo(0 * block_size_, 17 * block_size_)
                    .lineTo(4 * block_size_, 17 * block_size_)
                    .lineTo(4 * block_size_, 12 * block_size_)
                    .lineTo(8 * block_size_, 12 * block_size_)
                    .lineTo(8 * block_size_, 17 * block_size_)
                    .lineTo(12 * block_size_, 17 * block_size_)
                    .lineTo(12 * block_size_, 9 * block_size_)
                    .lineTo(4 * block_size_, 9 * block_size_)
                    .lineTo(4 * block_size_, 0 * block_size_)
                    .lineTo(0 * block_size_, 0 * block_size_)
                    .closePath();
      obj.addChild(shape);
      obj.x = block_start_x;
      obj.y = block_start_y;
      
      //Added property because of not existing
      obj.width = block_size_*12;
      obj.height = block_size_*17;  
    
      //hy_obj_.addChild(h_obj_);
    };

    //----------------------------
    // createY
    //----------------------------
    var createY = function(obj,color){

      var block_start_x = block_size_ * 2 + block_size_ * 5;
      var block_start_y = block_size_ * 2;
    
      //g.graphics.beginFill(Math.random() * 255 << 8);
      var shape = new Shape();
      shape.graphics.beginFill(color)
                    .lineTo(0 * block_size_, 8 * block_size_)
                    .lineTo(8 * block_size_, 8 * block_size_)
                    .lineTo(8 * block_size_, 17 * block_size_)
                    .lineTo(12 * block_size_, 17 * block_size_)
                    .lineTo(12 * block_size_, 0 * block_size_)
                    .lineTo(8 * block_size_, 0 * block_size_)
                    .lineTo(8 * block_size_, 5 * block_size_)
                    .lineTo(4 * block_size_, 5 * block_size_)
                    .lineTo(4 * block_size_, 0 * block_size_)
                    .lineTo(0 * block_size_, 0 * block_size_)
                    .closePath();
      obj.addChild(shape);
      obj.x = block_start_x;
      obj.y = block_start_y;
    
      //Added property because of not existing
      obj.width = block_size_*12;
      obj.height = block_size_*17;  
    
      //hy_obj_.addChild(y_obj_);
    };

    //----------------------------
    // createOutline
    //----------------------------
    var createOutline = function(obj,color){

      var block_start_x = 0;
      var block_start_y = 0;
    
      //g.graphics.beginFill(Math.random() * 255 << 8);
      var shape = new Shape();
      shape.graphics.beginFill(color)
                    .lineTo(0 * block_size_, 21 * block_size_)
                    .lineTo(1 * block_size_, 21 * block_size_)
                    .lineTo(1 * block_size_, 0 * block_size_)
                    .lineTo(0 * block_size_, 0 * block_size_)
                    .moveTo(1 * block_size_, 0 * block_size_)
                    .lineTo(21 * block_size_, 0 * block_size_)
                    .lineTo(21 * block_size_, 1 * block_size_)
                    .lineTo(1 * block_size_, 1 * block_size_)
                    .lineTo(1 * block_size_, 0 * block_size_)
                    .moveTo(20 * block_size_, 1 * block_size_)
                    .lineTo(20 * block_size_, 21 * block_size_)
                    .lineTo(21 * block_size_, 21 * block_size_)
                    .lineTo(21 * block_size_, 1 * block_size_)
                    .lineTo(20 * block_size_, 1 * block_size_)
                    .moveTo(1 * block_size_, 20 * block_size_)
                    .lineTo(20 * block_size_, 20 * block_size_)
                    .lineTo(20 * block_size_, 21 * block_size_)
                    .lineTo(1 * block_size_, 21 * block_size_)
                    .lineTo(1 * block_size_, 20 * block_size_)
                    .closePath();
      obj.addChild(shape);
      obj.x = block_start_x;
      obj.y = block_start_y;
    
      //Added property because of not existing
      obj.width = block_size_*21;
      obj.height = block_size_*21;  
    
      //hy_obj_.addChild(outline_obj_);
      
      //Added property because of not existing
      //hy_obj_.width = outline_obj_.width;
      //hy_obj_.height = outline_obj_.height;  
    };

    //----------------------------
    // create FPS Text
    //----------------------------
    var fpsText = function(){
  
      // add a text object to output the current FPS:
      fps_txt_ = new Text("-- fps","bold 14px Arial","#FFF");
      //stage_.addChild(fps_txt_);
      fps_txt_.x = 10;
      fps_txt_.y = 20;
      //Added property because of not existing to recognize
      fps_txt_.name = "fps";
    };

    //----------------------------
    // hy Tween1
    //----------------------------
    var hyTween1 = function(h_obj,y_obj,outline_obj,hy_obj){
      //hy_obj_.x = 0;
      //hy_obj_.y = 0;

      //1) set initial position
      //* hy_obj_.x,y of container are always 0.
      h_obj.x = - h_obj.width;
      h_obj.y = (stage_h_ - h_obj.height) / 2;
      y_obj.x = stage_w_;
      y_obj.y = (stage_h_ - y_obj.height) / 2;
      outline_obj.x = (stage_w_ - outline_obj.width) / 2;
      outline_obj.y = (stage_h_ - outline_obj.height) / 2;
    
      outline_obj.alpha = 0;
      //hy_obj.visible = true;
    
      //2) ステージ外から現れて、横切る -> 再度ステージ外から横切る
      //※コンテナのhy_obj_.x,yに対するアニメーションであって、h_obj_.xなどの情報は変わらない。;
      Tween.get(h_obj).to({x:stage_w_+h_obj.width},500,Ease.linear)
        .to({x:outline_obj.x + block_size_*2},500,Ease.linear);
    
      Tween.get(y_obj).to({x:-y_obj.width},500,Ease.linear)
        .to({x:outline_obj.x + block_size_*7},500,Ease.linear)
        //.play(tween1); //error
        .call(function(){
          //3) 枠の表示
          Tween.get(outline_obj).to({alpha:1},500,Ease.linear)
            .wait(200)
            .call(function(){
              //4) 落下
              //落下する高さ算出
              var fall_h     = stage_h_-outline_obj.y;
              var fall_top_h = - outline_obj.height;
              var fall_h2    = stage_h_-outline_obj.height;
    
              //※コンテナのhy_obj_.x,yに対するアニメーションであって、h_obj_.xなどの情報は変わらない。
              index = Math.floor(Math.random() * 3);
              ptn = [2,8,9];
              console.log(index);
              console.log(ptn[index]);
              
              Tween.get(hy_obj).to({y:fall_h},1000,Ease.cubicIn) //cubicIn
                .set({y:fall_top_h})
                .to({y:fall_h2-(fall_h2/2)},500,Ease.elasticOut) //bounceOut
                .wait(200)
                //.call(nextAnimation, [2], nextAnimation);
                //.call(nextAnimation, [8], nextAnimation);
                //.call(nextAnimation, [9], nextAnimation);
                .call(nextAnimation, [ptn[index]], nextAnimation);
              });
          });
    
      //Ticker
      anim_scene_=0;
    };

    //----------------------------
    // BitmapAnimation
    //----------------------------
    var bitmapAnimation = function(){

      var data = {
        images: ["./images/sparkle_21x23.png"],
        frames: {width:21,height:23,regX:10,regY:11}
      }
        
      // set up an animation instance, which we will clone
      bmp_anim_ = new BitmapAnimation(new SpriteSheet(data));
        
      //Ticker
      anim_scene_ = 1;  
    };

    //----------------------------
    // addSparkles
    //----------------------------
    var addSparkles = function(count, x, y, speed){

      //create the specified number of sparkles
      for (var i=0; i<count; i++) {
        // clone the original sparkle, so we don't need to set shared properties:
        var sparkle = bmp_anim_.clone();
    
        // set display properties:
        sparkle.x = x;
        sparkle.y = y;
        //sparkle.rotation = Math.random()*360;
        sparkle.alpha = Math.random()*0.5+0.5;
        sparkle.scaleX = sparkle.scaleY = Math.random()+0.3;
    
        // set up velocities:
        var a = Math.PI*2*Math.random();
        var v = (Math.random()-0.5)*30*speed;
        //独自プロパティを追加
        sparkle.vX = Math.cos(a)*v;
        sparkle.vY = Math.sin(a)*v;
        sparkle.vS = (Math.random()-0.5)*0.2; // scale
        sparkle.vA = -Math.random()*0.05-0.01; // alpha
    
        // start the animation on a random frame: ->シートのシーンをランダムで取得
        sparkle.gotoAndPlay(Math.random()*sparkle.spriteSheet.getNumFrames()|0);
    
        // add to the display list:
        stage_.addChild(sparkle);
      }
    };

    //----------------------------
    // filter ぼかし
    //----------------------------
    var filterAnimation = function(){
      console.log("filterAnimation");
      //sample例
      //cloneを先にやってみる※Containerクラスのcloneは中身まで反映されない。
      //hy_bmp_ = hy_obj_.clone();
      //なので、canvasをコピーして使う。
      //hy_bmp_ = new Bitmap(hy_obj_.getCacheDataURL());

      //必要なサイズにトリミング
      //console.log(hy_obj_)
      //console.log(hy_bmp_)
      
      hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height);

      //console.log(hy_obj_.cacheCanvas)
      //console.log(hy_obj_.cacheID);
      //console.log(hy_obj_.getCacheDataURL()); 

      //BoxBlurFilter
      count1_ = 0;
      count2_ = 0;
  
      //var blurFilter = new BoxBlurFilter(32, 2, 2);
      var blurFilter = new BoxBlurFilter(count1_, 2, 2);
      var margins = blurFilter.getBounds();
      hy_obj_.filters = [blurFilter]; //filterを入れ替えるとリセットされる。

      // filters are only displayed when the display object is cached
      // later, you can call updateCache() to update changes to your filters
      hy_obj_.cache(outline_obj_.x+margins.x, hy_obj_.y+margins.y, outline_obj_.width+margins.width, outline_obj_.height+margins.height);   
    
      //property
      hy_obj_.alpha = 1;  
      hy_obj_.name = "hy";
        
      //Ticker
      anim_scene_ = 2;

      //終了処理
      setTimeout( function() {
        anim_scene_ = 0;
        
        Tween.get(hy_obj_).to({alpha:0},1000,Ease.linear)
          .call(nextAnimation, [8], nextAnimation);
      },2000);
    };

    //----------------------------
    // filter2 グレースケール bmp利用
    // bmpにcanvasをコピーして、そちらを使う例
    //----------------------------
    var filterAnimation2 = function(){
      console.log("filterAnimation2");

      hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height);
      hy_bmp_ = new Bitmap(hy_obj_.getCacheDataURL());
      //ColorMatrixFilter(色が白だとわかりにくい)
      var greyScaleFilter = new ColorMatrixFilter([
        0.33,0.33,0.33,0,0, // red
        0.33,0.33,0.33,0,0, // green
        0.33,0.33,0.33,0,0, // blue
        0,0,0,1,0  // alpha
      ]);
      hy_bmp_.filters = [greyScaleFilter];
      hy_bmp_.cache(0, 0, outline_obj_.width, outline_obj_.height); // color filters don't change the bounds.
    
      hy_bmp_.name = "hy";
      hy_bmp_.x = outline_obj_.x;
      hy_bmp_.y = hy_obj_.y + outline_obj_.y;
        
      stage_.addChild(hy_bmp_);
      hy_obj_.uncache();
      stage_.removeChild(hy_obj_);
      
      //Ticker
      anim_scene_ = 0;
      
      //終了処理
      setTimeout( function() {
        anim_scene_ = 0;
        
        Tween.get(hy_bmp_).to({alpha:0},1000,Ease.linear)
          .call(nextAnimation, [5], nextAnimation);
      },2000);
    };

    //----------------------------
    // filter3 明度  mode:1->up , 2->down
    //----------------------------
    var filterAnimation3 = function(mode){
      console.log("filterAnimation3");
  
      hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height);
    
      //ColorMatrixFilter
      //default
      //1,0,0,0,0
      //0,1,0,0,0
      //0,0,1,0,0
      //0,0,0,1,0
      
      //http://wonderfl.net/c/BBKP
      //http://voglia.jp/2010/01/26/260
      
      //明度を変えるアニメーション
      //1,0,0,0,x(-100〜0〜100)
      //0,1,0,0,x(-100〜0〜100)
      //0,0,1,0,x(-100〜0〜100)
      //0,0,0,1,0
      count1_ = 0; //0->100 or 0->-100
      //filter リセット
      var greyScaleFilter = new ColorMatrixFilter([
        1, 0, 0, 0, count1_, // red
        0, 1, 0, 0, count1_, // green
        0, 0, 1, 0, count1_, // blue
        0,0,0,1,0            // alpha
      ]);
        
      hy_obj_.filters = [greyScaleFilter];
      hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height); // color filters don't change the bounds.
    
      hy_obj_.alpha = 1;  
      hy_obj_.name = "filter";  
    
      //Ticker
      if(mode==1) anim_scene_ = 3;
      else        anim_scene_ = 4;
    
      
      //終了処理
      setTimeout( function() {
        anim_scene_ = 0;
        
        Tween.get(hy_obj_).to({alpha:0},1000,Ease.linear)
          .call(function(){
            if(mode==1) nextAnimation(6);
            else        nextAnimation(7);
            });
      },3000);
    };

    //----------------------------
    // filter4 色反転
    //----------------------------
    var filterAnimation4 = function(){
      console.log("filterAnimation4");
  
      hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height);
      
      //色反転 アニメーション
      //-1,  0,  0, 0, 255,
      // 0, -1,  0, 0, 255,
      // 0,  0, -1, 0, 255,
      // 0,  0,  0, 1,   0
      //filter リセット
      var greyScaleFilter = new ColorMatrixFilter([
        1, 0, 0, 0, 0, // red
        0, 1, 0, 0, 0, // green
        0, 0, 1, 0, 0, // blue
        0, 0, 0, 1, 0  // alpha
      ]);
      hy_obj_.filters = [greyScaleFilter];
      hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height); // color filters don't change the bounds.
    
      count1_ = 0; //0->255 +=25.5
      count2_ = 1; //1->-1  -=0.2
      loop_   = 10;
        
      hy_obj_.alpha = 1;  
      hy_obj_.name = "filter";  
    
      //Ticker
      anim_scene_ = 5;
     
      //終了処理
    };

    //----------------------------
    // textAnimation
    //----------------------------
    var textAnimation = function(){
      console.log("textAnimation");
      count1_ = 0;
      count2_ = 0;
        
      //Ticker
      //anim_scene_ = 6;
      Ticker.setPaused(true);
    
      setInterval( function() {
        ctx_.fillStyle="rgba(0,0,0,0.05)";
        ctx_.fillRect(-10,-20,stage_w_,stage_h_);//TODO:なぜ-10が必要か？？
    
        ctx_.fillStyle="rgba("+ (Math.floor(Math.random()*255)) +","+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+",1)";
        ctx_.font=''+ Math.floor(Math.random()*200) +'px sans-serif';
        ctx_.textAlign="center";
        ctx_.textBaseline="middle";
        ctx_.fillText(text_data_[count1_],Math.random()*stage_w_,Math.random()*stage_h_);
    
        count1_++;
        if(count1_==text_data_.length) count1_=0;
      
      },100);
    };

    //----------------------------
    // rotationAnimation
    //----------------------------
    var rotationAnimation = function(){
      //hyの回転を表現してみる。
      //表示位置を決める角度(0:右, 90:下, 180:左, 270:上)
      count1_ = 90;
      //speed
      count2_ = 5;
      
      //scaleX
      count3_ = 0.1;
      //skewX
      count4_ = 0;
      
      //位置調整
      hy_obj_[0].x = 0;
      hy_obj_[0].y = 0;
      h_obj_[1].x = h_obj_[0].x = block_size_*1;
      h_obj_[1].y = h_obj_[0].y = block_size_*1;
      y_obj_[1].x = y_obj_[0].x = block_size_*3.5;
      y_obj_[1].y = y_obj_[0].y = block_size_*1;
      outline_obj_[0].x = outline_obj_[0].y = 0;
      h_obj_[1].scaleX = h_obj_[1].scaleY = h_obj_[0].scaleX = h_obj_[0].scaleY = 0.5;
      y_obj_[1].scaleX = y_obj_[1].scaleY = y_obj_[0].scaleX = y_obj_[0].scaleY = 0.5;
      outline_obj_[1].scaleX = outline_obj_[1].scaleY = outline_obj_[0].scaleX = outline_obj_[0].scaleY = 0.5;  
    
      //width再設定
      hy_obj_[1].width = hy_obj_[0].width = hy_obj_[0].width/2;
      hy_obj_[1].height = hy_obj_[0].height = hy_obj_[0].height/2;
    
      //色変換したやつを複製(cacheしか使えないうえに、移動とかできないぽい。。。)
      //hy_obj_.cache(hy_obj_.x, hy_obj_.y, hy_obj_.width, hy_obj_.height);
      //hy_bmp_ = new Bitmap(hy_obj_.getCacheDataURL());
    
      //var colFilter = new ColorMatrixFilter([
      //  -1,  0,  0, 0, 255,
      //   0, -1,  0, 0, 255,
      //   0,  0, -1, 0, 255,
      //   0,  0,  0, 1,   0
      //]);
      //hy_bmp_.filters = [colFilter];
      //hy_bmp_.cache(0, 0, hy_obj_.width, hy_obj_.height); //必要
      
      //中心点の変更
      hy_obj_[1].x = hy_obj_[1].y = hy_obj_[0].x = hy_obj_[0].y = (hy_obj_[0].width/2);
      hy_obj_[1].regX = hy_obj_[1].regY = hy_obj_[0].regX = hy_obj_[0].regY = (hy_obj_[0].width/2); 
      
      //bmp
      //hy_bmp_.x = hy_bmp_.y = hy_obj_.x;
      //stage_.addChild(hy_bmp_);
    
      //hy_obj2をセット
      stage_.addChild(hy_obj_[1]);
    
    
      //Ticker
      anim_scene_ = 7;
    };

    //----------------------------
    // imageの位置を計算し、移動 (円の軌道もここで調整)
    //----------------------------
    var rotationCalc = function(){
      //degree
      //radius
      var w = hy_obj_[0].width;
      var h = hy_obj_[0].height;
    
      var radius_x = (stage_w_-w)/2;  //横の半径 default 280
      //var radius_y = (stage_h_-h)/2;  //縦の半径 default 100
      var radius_y = (stage_h_-h)/3;  //縦の半径 default 100
      var adjust_x = stage_w_/2;      //表示位置調整用
      var adjust_y = stage_h_/2;      //表示位置調整用
        
      var rad = count1_ * pai_;
      var rad2 = (count1_+90) * pai_;
    
      var sin = Math.sin(rad);     // 1-> 0
      var cos = Math.cos(rad);     // 0->-1
      var cos2 = Math.cos(rad2);   //-1-> 0
    
      //拡大率 0.6は最小値
      var scale = ((sin + 1) * 0.2) + 0.6;
    
    
      // |演算子 2つ値の各ビットの論理和を求める　|0:これにより小数点切り捨てを行う
      // add 0.51は四捨五入
      hy_obj_[1].x = hy_obj_[0].x = (cos * radius_x + adjust_x + 0.5)|0;
      hy_obj_[1].y = hy_obj_[0].y = (sin * radius_y + adjust_y + 0.5)|0;
      hy_obj_[1].scaleX = hy_obj_[0].scaleX = cos2;
      hy_obj_[1].scaleY = hy_obj_[0].scaleY = 1; //初期化
    
      //角度が重要、
      //hy_obj_[0].skewY = (cos * 45)|0;
      hy_obj_[1].skewY = hy_obj_[0].skewY = (cos * 25)|0;
      if(hy_obj_[0].scaleX < 0){
        hy_obj_[0].skewY = -1*hy_obj_[0].skewY;
        hy_obj_[1].skewY = -1*hy_obj_[1].skewY;
        
        hy_obj_[0].visible = false;
        hy_obj_[1].visible = true;
      }else{
        hy_obj_[0].visible = true;
        hy_obj_[1].visible = false;
      }
    
      //拡大率適用
      hy_obj_[0].scaleX *= scale;
      hy_obj_[0].scaleY *= scale;
      hy_obj_[1].scaleX *= scale;
      hy_obj_[1].scaleY *= scale;
      
      //こっちのほうがパフォーマンスいいかな？
      //hy_obj_.setTransform ( x , y , scaleX , scaleY , rotation , skewX , skewY , regX , regY );
    
    /*
      //右 0
      //hy_obj_.scaleX = 0.1;
      //hy_obj_.skewY = 0;
      
      //右下 45
      //hy_obj_.scaleX = -0.6;
      //hy_obj_.skewY = -45; //移動位置と領域がせまくなる。これを補正するためには？
    
      //下 90
      //hy_obj_.scaleX = -1;
      //hy_obj_.skewY = 0;
    
      //左下 135
      //hy_obj_.scaleX = -0.6;
      //hy_obj_.skewY = 45; //移動位置と領域がせまくなる。これを補正するためには？
    
      //左 180
      //hy_obj_.scaleX = -0.1;
      //hy_obj_.skewY = 0;
    
      //左上 225
      //hy_obj_.scaleX = 0.6;
      //hy_obj_.skewY = -45; //移動位置と領域がせまくなる。これを補正するためには？
    
      //上 270
      //hy_obj_.scaleX = 1;
      //hy_obj_.skewY = 0;
      
      //右上 315
      //hy_obj_.scaleX = 0.6;
      //hy_obj_.skewY = 45; //移動位置と領域がせまくなる。これを補正するためには？
    */
    
      //EaselJSのMatrix2Dクラスが良さげだけど、あとで。
      //Matrix2D
      //var mtx = new Matrix2D();
                      //90,135, 180, 225,270,315, 0,  45
      //mtx.a = 0.5;    //1, 0.5, 0.1, 0.5, 1, 0.5, 0.1, 0.5
      //mtx.b = 0.5;    //0, 0.5, 0,  -0.5, 0, 0.5, 0,  -0.5 
      //mtx.c = 0;
      //mtx.d = 1;
      //mtx.tx = 50;
      //mtx.ty = 50;    
      //var rtn_mtx = hy_obj_.getConcatenatedMatrix(mtx);
    };

    //----------------------------
    // regist Animation
    //----------------------------
    var registEvent = function(){
      canvas_.onmousemove = moveCanvas;
      canvas_.onclick = clickCanvas;
    };

    //----------------------------
    // sparkle explosion
    //----------------------------
    var clickCanvas = function(e){
      //count, x, y, speed
      // |0 の記述で小数点の切り捨てを行う +100で100<300の範囲になる。
      addSparkles(Math.random()*200+100|0, stage_.mouseX, stage_.mouseY,2);
    };

    //----------------------------
    // nextAnimation
    //----------------------------
    var nextAnimation = function(scene){
      switch(scene){
      case 1:
        console.log("anim1 hyロゴが落ちる");
        hyTween1(h_obj_[0],y_obj_[0],outline_obj_[0],hy_obj_[0]);
        break;    
      case 2:
        console.log("anim2 マウスイベントで星を出す");
        //regist Event
        registEvent();
        
        //BitmapAnimation
        bitmapAnimation();
        break;
      case 3:
        console.log("anim3 hyロゴにぼかしフィルタを適用");
        //Bitmap
        filterAnimation();
        break;
      case 4:
        console.log("anim4 hyロゴにグレーフィルタを適用");
        //Bitmap
        filterAnimation2();
        break;
      case 5:
        console.log("anim5 hyロゴにカラーフィルタ適用 明度up");
        //Bitmap
        filterAnimation3(1);
        break;
      case 6:
        console.log("anim6 hyロゴにカラーフィルタ適用 明度down");
        //Bitmap
        filterAnimation3(2);
        break;
      case 7:
        console.log("anim7 hyロゴにカラーフィルタ適用 色反転");
        //Bitmap
        filterAnimation4();
        break;
      case 8:
        console.log("anim8 タイポグラフィ");
        textAnimation();    
        break;    
      case 9:
        console.log("anim9 image 回転");
        rotationAnimation();    
        break;    
      default:
      
      }
    };

    //----------------------------
    // sparkle trail
    //----------------------------
    var moveCanvas = function(e){
      //count, x, y, speed
      addSparkles(Math.random()*2+1|0, stage_.mouseX, stage_.mouseY,1);
    };

//------------------------------------------------------------------------------
//public
//------------------------------------------------------------------------------
    //----------------------------
    // tick /Enterframe
    //----------------------------
    hy.tick = function(){
      //シーンチェンジ
      switch(anim_scene_){
      case 0:
        break;
      case 1:
        var l = stage_.getNumChildren(); //hyは含まれないぽい
        for (var i=l-1; i>0; i--) {
          var sparkle = stage_.getChildAt(i);
          if (sparkle.name == "fps") break;
          if (sparkle.name == "hy") break;
          
          // apply gravity and friction
          sparkle.vY += 2;
          sparkle.vX *= 0.98;

          // update position, scale, and alpha:
          sparkle.x += sparkle.vX;
          sparkle.y += sparkle.vY;
          sparkle.scaleX = sparkle.scaleY = sparkle.scaleX+sparkle.vS;
          sparkle.alpha += sparkle.vA;
    
          //remove sparkles that are off screen or not invisble
          if (sparkle.alpha <= 0 || sparkle.y > canvas_.height) {
            stage_.removeChildAt(i);
          }
        }
        break;
      case 2:
        //ぼかしFilter 重い。。。
        var s_time = (new Date).getTime();
        var blurFilter = new BoxBlurFilter(count1_+=8, 2, 2);
        var margins = blurFilter.getBounds();
        hy_obj_.filters = [blurFilter];
    
        hy_obj_.cache(outline_obj_.x+margins.x, hy_obj_.y+margins.y, outline_obj_.width+margins.width, outline_obj_.height+margins.height); 
        //hy_obj_.updateCache(margins.x,margins.y,outline_obj_.width+margins.width,outline_obj_.height+margins.height);
        var e_time = (new Date).getTime();
        //console.log(e_time - s_time);
    
        break;
      case 3:
      case 4:
        //カラーFilter //※ぼかしよりは軽い
        //明度のアニメーション
        if(anim_scene_==3) count1_+=5;
        if(anim_scene_==4) count1_-=5;    
        //var s_time = (new Date).getTime();
        var greyScaleFilter = new ColorMatrixFilter([
              1, 0, 0, 0, count1_, // red
              0, 1, 0, 0, count1_, // green
              0, 0, 1, 0, count1_, // blue
              0,0,0,1,0  // alpha
        ]);
        hy_obj_.filters = [greyScaleFilter];
        hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height); // color filters don't change the bounds.
        //var e_time = (new Date).getTime();
        //console.log(e_time - s_time);
        break;
      case 5:
        //カラーFilter //※ぼかしよりは軽い
        //反転アニメーション
        count1_ += 25.5; //0->255
        count2_ -= 0.2;  //1->-1
    
        //var s_time = (new Date).getTime();
        var greyScaleFilter = new ColorMatrixFilter([
          count2_, 0, 0, 0, count1_, // red
          0, count2_, 0, 0, count1_, // green
          0, 0, count2_, 0, count1_, // blue
          0, 0, 0, 1, 0  // alpha
        ]);
        hy_obj_.filters = [greyScaleFilter];
        hy_obj_.cache(outline_obj_.x, hy_obj_.y, outline_obj_.width, outline_obj_.height); // color filters don't change the bounds.
        //var e_time = (new Date).getTime();
        //console.log(e_time - s_time);
    
        if(--loop_ == 0){
          anim_scene_=0;
          nextAnimation(3);
        }
    
        break;
      case 6:
        //text animation(動かしていると遅くなる)
        var shape = new Shape();
        shape.graphics.beginFill("rgba(0,0,0,0.5)")
                        .drawRect(0,0,stage_w_,stage_h_);
        stage_.addChild(shape);
    
        var txt = new Text(text_data_[count1_],""+Math.floor(Math.random()*200)+"px sans-serif","rgb("+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+")");
        stage_.addChild(txt);
        txt.x = Math.random()*stage_w_;
        txt.y = Math.random()*stage_h_;
              
        count1_++;
        if(count1_==text_data_.length) count1_=0;
        break;
      case 7:
        //imageの位置を計算し、回転
        //speed //+:時計回り
        count1_ += count2_;
        if(count1_ >= 360) count1_-=360;
        if(count1_ <= 0) count1_=0;
        rotationCalc();
        break;
      case 8:
        break;
      case 9:
        break;
      default :
        //none  
      }
      
      //FPS(最上位レイヤーへ)
      fps_txt_.text = Math.round(Ticker.getMeasuredFPS())+" fps";
            
      // draw the updates to stage:
      stage_.update();
    };


    //----------------------------
    //initialize
    //----------------------------
    hy.init = function(){
      if(isAndroid_.result || isiPhone_.result){
        //stage_w_ = screen.width;
        //stage_h_ = screen.height;
        stage_w_ = window.innerWidth;
        stage_h_ = window.innerHeight;
    
        //iPhone全画面対応
        setTimeout(function(){
          //windowオブジェクトを1ピクセルスクロール
          window.scrollTo(0,1);
        },1);
      }else{
        stage_w_ = window.innerWidth;
        stage_h_ = window.innerHeight;
      }
      //iPhone4Sではscreen.widthが320pxになる
      block_size_ = Math.floor(stage_w_/48);
    
      // create a new stage and point it at our canvas:
      canvas_ = document.getElementById("stage_canvas");
      ctx_ = canvas_.getContext("2d");

      canvas_.width = stage_w_;
      canvas_.height = stage_h_;
      
      stage_ = new Stage(canvas_);

      //create h + y   
      createH(h_obj_[0],"#33ff33");
      hy_obj_[0].addChild(h_obj_[0]);
      createH(h_obj_[1],"#ff00ff");
      hy_obj_[1].addChild(h_obj_[1]);
    
      createY(y_obj_[0],"#33ff33");
      hy_obj_[0].addChild(y_obj_[0]);
      createY(y_obj_[1],"#ff00ff");
      hy_obj_[1].addChild(y_obj_[1]);
    
      createOutline(outline_obj_[0],"#33ff33");
      hy_obj_[0].addChild(outline_obj_[0]);
      createOutline(outline_obj_[1],"#ff00ff");
      hy_obj_[1].addChild(outline_obj_[1]);
      
      //プロパティが存在しないので追加
      hy_obj_[0].width = outline_obj_[0].width;
      hy_obj_[0].height = outline_obj_[0].height;  
      hy_obj_[1].width = outline_obj_[1].width;
      hy_obj_[1].height = outline_obj_[1].height;  
       
      stage_.addChild(hy_obj_[0]);
    
      //create FPS Text
      fpsText();
      
      // start the tick and point it at the window so we can do some work before updating the stage:
      Ticker.addListener(window);
      Ticker.setFPS(30);
      //Ticker.setPaused(true);
      
      nextAnimation(1);
    };

    //debug start
    hy.debugStart = function(){
      _s_time = (new Date).getTime();
      console.log("debug start")
    };
    //debug end
    hy.debugEnd = function(){
      var e_time = (new Date).getTime();
      var result = e_time - _s_time;
      console.log("debug end")
      return result;
    };
    
    //initial
    //hy.ios = checkiOS();
    //hy.android = checkAndroid();
    window.hy = hy;
    window.tick = hy.tick;
})();

/** 
 * @extension
 */
hy.newFunc = function(){
};

//------------------------------------------------------------------------------
//EventListener
//------------------------------------------------------------------------------
//DOMContentLoaded
document.addEventListener("DOMContentLoaded",hy.init,false);
