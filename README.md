spriteAnimator
==============

spriteAnimator
 can be used normal as 
$(this).spriteAnimator({currentFrame: 1,totalFrames:14,fps:30,fromFrame: 1,loop: false});
or on reverse  
 $(this).spriteAnimator({currentFrame: 14,totalFrames:14,fps:30,fromFrame: 1,loop: false,reverse:true});
 
 stop
 $(this).spriteAnimator("stop");
 - clears the interval 
 
 destroy
 $("#burbujas4").spriteAnimator("destroy");
  - clears the interval 
  - set the element as display none
