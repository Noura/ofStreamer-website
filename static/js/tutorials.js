/* Tutorial page for ofStream
 * Noura Howell, October 2013
 *
 * Currently this just manages scrolling through the steps of the tutorial,
 * keeping in sync with the steps listed in the sidebar. The URL hash represents
 * which step is scrolled to. I intentionally did not make the URL hash match
 * the ID of HTML elements because this did not give the behavior I wanted. If 
 * the URL hash matches the ID of HTML elements on the page, then changing the 
 * URL hash will automatically jump scroll to that element. I want to update the
 * URL hash while the user is scrolling to match the step they have scrolled to,
 * without causing the jerky feeling of jumping around when changing the hash.
 *
 * Also, sorry about the ugly/verbose selectors and class names. I was rushing.
 * 
 */

$(document).ready(function(){
    // save jQuery objects for efficiency
    var $window = $(window);
    var $steps = {};
    _.each(steps, function(step, i) {
        $steps[i+1] = $('[data-step="'+(i+1)+'"]');
    });

    window.$steps = $steps;

    function scroll_to_hash(hash) {
        if (hash.length > 5 && hash.slice(0, 5) == "#step") {
            var n = parseInt(hash.slice(5));
            if ($steps[n]) {
                $window.scrollTop($steps[n].position().top);
            }
        }
    }
    
    function highlight_sidebar(hash) {
        $('li.tutorial-step-li').removeClass('active');
        $('a.link-to-tutorial-step[href="'+hash+'"]').parent('li.tutorial-step-li').addClass('active');
    }

    // on page load, scroll to the URL hash
    scroll_to_hash(window.location.hash);
    highlight_sidebar(window.location.hash);

    // clicking a tutorial step link will automatically change the hash
    // and this will scroll to the right part of the document
    $('a.link-to-tutorial-step').on('click', function(ev) {
        var hash = $(this).attr('href');
        scroll_to_hash(hash);
        highlight_sidebar(hash); 
    });

    // make the URL hash match the highest visible step
    function sync_hash() {
        var scrollTop = $window.scrollTop();
        var current_step = null;
        var min_scrollTop_diff = null;
        _.each($steps, function($step, n) {
            var scrollTop_diff = $steps[n].position().top - scrollTop;
            if (min_scrollTop_diff === null ||
                min_scrollTop_diff < 0 ||
                (scrollTop_diff >= 0 && scrollTop_diff < min_scrollTop_diff)) {
                min_scrollTop_diff = scrollTop_diff;
                current_step = n;
            }
        });
        if (current_step !== null) {
            var hash = '#step' + current_step;
            window.location.hash = hash;
            highlight_sidebar(hash);
        }       
    };
    var sync_hash_throttled = _.throttle(sync_hash, 500);
    $window.on('scroll', sync_hash_throttled);
});
