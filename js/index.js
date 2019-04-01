
function DriftLogoAnim() {

  var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function(s) {
      return document.querySelector(s);
    },
    selectAll = function(s) {
      return document.querySelectorAll(s);
    }, 
    mainSVG = select('.logoSVG'),
    mainTl,
    numWings = 7,
    allWings = selectAll('#wingGroup path')

  this.init = function() {
    TweenMax.set(mainSVG, {
      visibility: 'visible'
    })
    
    TweenMax.staggerTo(allWings, 0, {
      cycle:{
        autoAlpha:function(i){
          
          return (i > 0) ? 0 : 1
        }
      }
    })
    mainTl = new TimelineMax({repeat:13, yoyo:true, paused:true}).timeScale(20);
    mainTl.to({wingId:0}, numWings, {
  wingId:numWings,
  ease:SteppedEase.ease.config(numWings),
  onUpdate:function(){
    var wingId =  Math.round(this.target.wingId);
    TweenMax.staggerTo('#wingGroup path', 0, {
      cycle:{
        autoAlpha:function(i){
          //console.log(wingId)
          return (i == wingId) ? 1 : 0
        }
      }
    },0)
    
  }
})
.to('.logoWholeBird', numWings, {
  y:-6,
  ease:Sine.easeInOut
},'-=' + numWings)
.to('#birdTail', numWings, {
  rotation:-5,
  transformOrigin:'100% -50%',
  ease:Sine.easeInOut
},'-=' + numWings)


  }

  this.play = function() {
    mainTl.play(0);
  }

  this.pause = function() {
    mainTl.pause();
  }
}

var myDriftLogoAnim = new DriftLogoAnim();
myDriftLogoAnim.init();
myDriftLogoAnim.play();
document.body.onclick = myDriftLogoAnim.play;