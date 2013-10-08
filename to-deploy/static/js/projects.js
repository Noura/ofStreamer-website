/* Projects page of ofStreamer 
 * Noura Howell, October 2013
 * 
 * Clicking on a project thumbnail plays the associated vimeo video.
 *
 */

window.onload = function(){
    $('.thumbnail').on('click', function(ev) {
        var vimeo_id = $(this).data('vimeoid');
        if (vimeo_id) {
            $('#video-container').empty().append('<iframe src="//player.vimeo.com/video/' + vimeo_id +'" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'); // <p><a href="http://vimeo.com/57332391">WaaZam- A System for Creative Play at a Distance</a> from <a href="http://vimeo.com/user15656392">Seth Hunter</a> on <a href="https://vimeo.com">Vimeo</a>.</p>');
        }
    });
};
