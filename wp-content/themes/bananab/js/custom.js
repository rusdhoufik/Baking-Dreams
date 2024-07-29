/*document.addEventListener("DOMContentLoaded", function() {
  const containers = document.querySelectorAll('.sticky-container .wpb_wrapper');
  console.log('Containers found:', containers);

  if (containers.length === 0) {
    console.log('No containers found, please check the querySelector.');
  }

  containers.forEach(function(container) {
    container.addEventListener("wheel", function (e) {
     
		if (e.deltaY > 0) {
       
        container.scrollLeft += 100;
        e.preventDefault();
      } else {
        container.scrollLeft -= 100;
        e.preventDefault();
      }
    });
  });
})
*/
/*
var dummyEvent = {
  originalEvent: {
    deltaY: 0
  },
  preventDefault: function() {}
};
 var threshold = 100;

function toggleDocumentScroll(disable) {
  $('body, html').css('overflow', disable ? 'hidden' : 'auto');
}
function initialDocumentScroll() {
  var scrollTop = $(window).scrollTop();
  var startPoint = $('#start-point').offset().top;
  var diff = Math.abs(startPoint - scrollTop);

  if (diff <= threshold) {
    toggleDocumentScroll(true);
  } else {
    toggleDocumentScroll(false);
  }
}


$(document).ready(function() {
  // Define the threshold in pixels, e.g. 100 pixels
 

  function init() {
    var containers = $('.sticky-container .wpb_wrapper');
    console.log('Containers found:', containers);

    if (containers.length === 0) {
      console.log('No containers found, please check the querySelector.');
    }

  wheelHandler(dummyEvent, containers);

  // Attach a scroll event listener to the window
  $(window).scroll(function() {
    wheelHandler(dummyEvent, containers);
  });

   // Set the initial document scroll state
  initialDocumentScroll();

  // Attach a scroll event listener to the window
  $(window).scroll(function() {
    initialDocumentScroll();
  });

  // Bind the wheel event to the window
  bindEvents(containers);
  }




function bindEvents(containers) {
  $(window).on('wheel', function(e) {
    wheelHandler(e, containers);
  });
}
 function wheelHandler(e, containers) {
  var scrollTop = $(window).scrollTop();
  var startPoint = $('#start-point').offset().top;
  var diff = Math.abs(startPoint - scrollTop);

  if (diff <= threshold) {
    var targetContainer = null;

    containers.each(function() {
      if ($(this).find(e.target).length) {
        targetContainer = $(this);
        return false; // break out of the loop
      }
    });

    if (!targetContainer) {
      return;
    }

    var scrollLeft = targetContainer.scrollLeft();
    var clientWidth = targetContainer.innerWidth();
    var scrollWidth = targetContainer.get(0).scrollWidth;

    console.log('scrollLeft:', scrollLeft);
    console.log('clientWidth:', clientWidth);
    console.log('scrollWidth:', scrollWidth);

    // Check if the user has scrolled to the end of the container
    if (scrollLeft + clientWidth >= scrollWidth && e.originalEvent.deltaY > 0) {
      // Reached end of the container width
      console.log('reached-end');
      toggleDocumentScroll(false);
    } else if (scrollLeft === 0 && e.originalEvent.deltaY < 0) {
      // Reached the beginning of the container width
      console.log('reached-start');
      toggleDocumentScroll(false);
    } else {
      // Perform horizontal scrolling
      if (e.originalEvent.deltaY > 0) {
        targetContainer.scrollLeft(scrollLeft + 110);
      } else {
        targetContainer.scrollLeft(scrollLeft - 110);
      }

      // Disable the document scroll
      toggleDocumentScroll(true);

      // Prevent the default document scroll behavior
      e.preventDefault();
    }
  } else {
    // Re-enable the document scroll when outside the threshold
    toggleDocumentScroll(false);
  }
}







  init();
});

*/
$ = jQuery;
setTimeout(function() {

    document.addEventListener('DOMContentLoaded', function() {
        let scrollContainers = document.querySelectorAll('.sticky-containerss');

        scrollContainers.forEach(function(container) {
            container.addEventListener('wheel', function(e) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            });
        });
    });


    init();

    var g_containerInViewport;

    function init() {

        setStickyContainersSize();
        bindEvents();
    }

    function bindEvents() {
        window.addEventListener("wheel", wheelHandler);
    }

    function setStickyContainersSize() {

        document.querySelectorAll('.sticky-container>.row_col_wrap_12>.vc_col-sm-12>.vc_column-inner').forEach(function(container) {

            const stikyContainerHeight = container.querySelector('.wpb_wrapper').scrollWidth;

            container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }


    function wheelHandler(evt) {
        const allContainers = Array.from(document.querySelectorAll('.sticky-container>.row_col_wrap_12>.vc_col-sm-12>.vc_column-inner'));
        const containerInViewPort = allContainers.filter(function(container) {
            return isElementInViewport(container);
        })[0];

        //console.log('All containers:', allContainers);
        //console.log('Container in viewport:', containerInViewPort);

        if (!containerInViewPort) {
            return;
        }

        const containerTopBelowViewportTop = containerInViewPort.getBoundingClientRect().top <= 0;

        console.log('Container top below viewport top:', containerTopBelowViewportTop);

        let g_canScrollHorizontally = containerTopBelowViewportTop;

        //console.log('Can Scroll Horizontally', g_canScrollHorizontally);

        if (g_canScrollHorizontally) {
            containerInViewPort.querySelector('.wpb_wrapper').scrollLeft += evt.deltaY;
        }
    }





    const stickyContainer = document.querySelector('.sticky-container');

    if (stickyContainer) {
        document.documentElement.style.overflow = 'initial';
        document.body.style.overflow = 'initial';
    }




}, 1000)