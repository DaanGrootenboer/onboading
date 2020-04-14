import './style.scss';

var $ = require('jquery');

$(function() {
  $('#prev').on('click', function() {
    $('#vehicle').attr('data-dir', 'left');
    $('#map').css('transform', 'translate(-' + 0 + 'px)');
    $('.info').removeClass('is-active');
    $('.info.info-0').addClass('is-active');
    $('.wheel').addClass('is-moving');
    $('#vehicle').removeClass('is-init');
    setTimeout(function() { $('.wheel').removeClass('is-moving'); }, 1000);
  });

  $('#next').on('click', function() {
    $('#vehicle').attr('data-dir', 'right');
    $('#map').css('transform', 'translate(-' + 225 + 'px)');
    $('.info').removeClass('is-active');
    $('.info.info-1').addClass('is-active');
    $('.wheel').addClass('is-moving');
    $('#vehicle').removeClass('is-init');
    setTimeout(function() { $('.wheel').removeClass('is-moving'); }, 1000);
  });
});
