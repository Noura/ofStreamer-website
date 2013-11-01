/* Tutorial page for ofStream
 * Noura Howell, October 2013
 *
 * Currently this just manages scrolling through the steps of the tutorial,
 * keeping in sync with the steps listed in the sidebar. As the page scrolls,
 * the hash in the URL and the sidebar highlight update to match the currently
 * visible step. Clicking on the sidebar will scroll the page to the chosen step
 * which will also update the hash and sidebar highlight.
 *
 * I intentionally did not make the URL hash match the ID of HTML elements
 * because this did not give the behavior I wanted. If the URL hash matches the
 * ID of HTML elements on the page, then changing the URL hash will
 * automatically jump scroll to that element. I want to update the URL hash
 * while the user is scrolling to match the step they have scrolled to, without
 * causing the jerky feeling of jumping around when changing the hash.
 *
 * Also, sorry about the ugly/verbose selectors and class names. I was rushing.
 *
 */

$(document).ready(function(){
    // save jQuery objects for efficiency
    var $window = $(window);
    var $steps = {};
    _.each(steps, function(step, i) { // steps variable is available from tutorials.html
        // numbers the tutorial steps 1, 2, 3, ...
        $steps[i+1] = $('[data-step="'+(i+1)+'"]');
    });

    // For debugging. In the console you can access variables attached to the window
    window.$steps = $steps;

    // Scrolls the window to the right step in the tutorial
    // hash should be in a format like '#stepX' where X is a step in the tutorial
    function scroll_to_hash(hash) {
        if (hash.length > 5 && hash.slice(0, 5) == "#step") {
            var n = parseInt(hash.slice(5));
            if ($steps[n]) {
                $window.scrollTop($steps[n].position().top);
            }
        }
    }

    // highlights the appropriate step in the sidebar
    function highlight_sidebar(hash) {
        $('li.tutorial-step-li').removeClass('active');
        $('a.link-to-tutorial-step[href="'+hash+'"]').parent('li.tutorial-step-li').addClass('active');
    }

    // on page load, scroll to the URL hash
    scroll_to_hash(window.location.hash);
    highlight_sidebar(window.location.hash);

    // clicking the sidebar will change the hash, scroll to that step, and
    // update the sidebar highlight
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
    // Throttling a function makes it only execute at most once every interval,
    // in this case at most once every 500ms. This is necessary for performance
    // because it would be too expensive to execute our sync_hash function
    // every time the 'scroll' event is fired.
    var sync_hash_throttled = _.throttle(sync_hash, 500);
    $window.on('scroll', sync_hash_throttled);
});
