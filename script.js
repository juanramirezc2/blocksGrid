/*window.onload=function(){

  var container = document.querySelector('#layout-grid');
  var msnry = new Masonry(container, {
    itemSelector: '.collage-grid-item'
    //gutter: 18
  });

}
*/
function Gallery(selector,options){
   this.elementSpecs=[];
   this.errorAspect=10;
   this.gutter=18;

   document.querySelectorAll('#layout-grid')[0].style.position="relative";
   this.contentWidth=document.querySelectorAll('#layout-grid')[0].offsetWidth;
   this.setElementPos=function(element,cursorVertical,cursorHorizontal){
     element.style.top=cursorVertical+"px";
     element.style.left=cursorHorizontal+"px";
     console.log("top",cursorVertical);
     console.log("left",cursorHorizontal);
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

    var myNodeList = document.querySelectorAll('#layout-grid .collage-grid-item');

     var getSpects=function(index,value){
        ratioHiger=value.offsetHeight>value.offsetWidth+this.errorAspect;
        ratioWider= value.offsetWidth > value.offsetHeight + this.errorAspect;
        this.elementSpecs.push({"row":0,"ratioH":ratioHiger,"ratioW":ratioWider,"el": value});
      }
       this.forEach(myNodeList,getSpects,this);

        var DefaultOptions={
        itemSelector:'.item',
        columnWidth:'25%'
        }
    options=(typeof(options)!="undefined") ? options:DefaultOptions;
    this.setPositions(this.elementSpecs,this.contentWidth);
}

window.onload=function(){
  selector=document.querySelector('#container ');
  gallery=new Gallery(selector,{
    itemSelector:".collage-grid-item"
  });
}
