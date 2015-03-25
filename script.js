function Gallery(selector){
   classComponent=selector;
   this.parentElement=selector;
   this.elementSpecs=[];
   this.errorAspect=10;
   this.gutter=18;
   classComponent.style.position="relative";
   classComponent.style.height="600px";
   this.contentWidth=classComponent.offsetWidth;


    /*Methods of the object */
   this.setElementPos=function(element,cursorVertical,cursorHorizontal){
     element.style.top=cursorVertical+"px";
     element.style.left=cursorHorizontal+"px";
   }

   this.checkHigher=function(iterator,HiderElementsStack){
     exist=HiderElementsStack[iterator.toString()] != undefined;
     if(exist){
       width=HiderElementsStack[iterator.toString()];
       delete HiderElementsStack[iterator.toString()];
       return width;
     }

     else{
       return false;
     }
   }



   this.setPositions=function(elementSpecs, contentWidth){
     var iterator=1;
     var cursorHorizontal=0;
     var cursorVertical=0;
     var HiderElementsStack=[];

     for (var i = 0; i < elementSpecs.length; i++) {
      element=elementSpecs[i].el;
      element.style.position="absolute";
      if(cursorHorizontal<(contentWidth+this.errorAspect)-element.offsetWidth){
        checked=this.checkHigher(iterator,HiderElementsStack);
        if(checked){ //if the current position is empty for a higher ratio element
          cursorHorizontal+=checked;
        }
        if(elementSpecs[i].ratioH){
          HiderElementsStack[iterator.toString()]=element.offsetWidth;
        }
        this.setElementPos(element,cursorVertical,cursorHorizontal);
        //TODO position of the element here
        cursorHorizontal+=element.offsetWidth;
        if(element.ratioW){
          iterator+=2;
        }
        else{
          iterator++;
        }
      }else{
        iterator=1;
        classComponent.style.width=cursorHorizontal+"px";
        cursorHorizontal=0;
        cursorVertical+=element.offsetHeight
        checked=this.checkHigher(iterator,HiderElementsStack);
        if(checked){ //if the current position is empty for a higher ratio element
          cursorHorizontal+=checked;
        }
        //TODO position of the element here
        this.setElementPos(element,cursorVertical,cursorHorizontal);
        cursorHorizontal+=element.offsetWidth;
        if(element.ratioW){
          iterator+=2;
        }
        else{
          iterator++;
        }
      }


     }
   }

 this.forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
          callback.call(scope, i, array[i]); // passes back stuff we need
        }
      };

    
     var getSpects=function(index,value){
        ratioHiger=value.offsetHeight>value.offsetWidth+this.errorAspect;
        ratioWider= value.offsetWidth > value.offsetHeight + this.errorAspect;
        console.log()
        this.elementSpecs.push({"row":0,"ratioH":ratioHiger,"ratioW":ratioWider,"el": value});
      }
    var myNodeList = $(classComponent).find('.collage-grid-item');
    this.forEach(myNodeList,getSpects,this);
    this.setPositions(this.elementSpecs,this.contentWidth);
  this.onResize=function(){
      var myNodeList = $(this.parentElement).find('.collage-grid-item');
      this.forEach(myNodeList,getSpects,this);
      this.setPositions(this.elementSpecs,this.contentWidth);
   }
}


$(window).bind("load", function() {
   
      collagesStack=[];
      collages=document.querySelectorAll("[data-component]");
      [].forEach.call(collages, function(collage) {
            collagesStack.push(new Gallery(collage));
      });
});





  
