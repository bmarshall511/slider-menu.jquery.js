/**
 * jQuery Slider Menu Plugin
 *
 * @version 1.2.1
 */
( function( $ ) {
  'use strict';

  $.fn.sliderMenu = function( options ) {
    var settings = $.extend({
      back: '<span>Back</span>'
    }, options ),
    elements = {}, methods = {};

    methods.initMenu = function( element ) {
      var $menu = this.buildMenu( element.clone() );
      element.replaceWith(  $menu  );

      $( $menu ).on( 'click', 'a', function( event ) {
        elements.$container  = $( this ).closest( '.slider-menu' );
        elements.$parentItem = $( this ).parent( 'li' );
        elements.$parentMenu = elements.$parentItem.parent( 'ul' );
        elements.$childMenu  = $( '> ul', elements.$parentItem );

        methods.clickHandler( event, $( this ) );
      });
    };

    methods.buildMenu = function( $menu ) {
      var $newMenu = $( '<div>' ).addClass( 'slider-menu' ),
          $nav     = $( '<nav>' ).attr({
                                   'role'       : 'navigation',
                                   'aria-label' : 'Menu',
                                   'data-left'  : 0
                                 });

      $( 'ul', $menu ).prepend( '<li><a href="#" class="slider-menu-back">' + settings.back + '</a>' )
                      .parent()
                      .addClass( 'slider-menu-children' );
      $nav.html( $menu );
      $newMenu.html( $nav );

      return $newMenu;
    };

    methods.clickHandler = function( event, $link ) {
      if ( elements.$childMenu.length || $link.hasClass( 'slider-menu-back' ) ) {
        event.preventDefault();

        if ( elements.$parentItem.data( 'vertical' ) ) {
          methods.toggleExpand( $link );
        } else {
          methods.slideController( $link );
        }
      }
    };

    methods.toggleExpand = function( $link ) {
      if ( elements.$childMenu.is( ':visible' ) ) {
        // Hide
        elements.$parentMenu.addClass( 'slider-menu-active' );
        elements.$childMenu.removeClass( 'slider-menu-active' );
        elements.$container.css( 'height', elements.$parentMenu.height() );

        $link.removeClass( 'slider-menu-open' );
      } else {
        // Show
        elements.$childMenu.addClass( 'slider-menu-active' );
        elements.$container.css( 'height', elements.$parentMenu.height() );

        $link.addClass( 'slider-menu-open' );
      }
    };

    methods.slideController = function( $link ) {
      $( '[data-vertical="true"] ul', elements.$container ).removeClass( 'slider-menu-active' );
      $( '[data-vertical="true"] a', elements.$container ).removeClass( 'slider-menu-open' );
      elements.$parentMenu.removeClass( 'slider-menu-active' );

      if ( $link.hasClass( 'slider-menu-back' ) ) {
        methods.slide( $link, true );
      } else {
        methods.slide( $link );
      }
    };

    methods.slide = function( $link, back ) {
      var $nav        = $( 'nav', elements.$container ),
          $activeMenu = back ? elements.$parentMenu.parent().parent() : $( '> ul', elements.$parentItem ),
          currentLeft = back ? parseInt( $nav.attr( 'data-left' ), 10 ) + 100 : parseInt( $nav.attr( 'data-left' ), 10 ) - 100;

      $activeMenu.addClass( 'slider-menu-active' )
                 .parents( 'ul' ).addClass( 'slider-menu-active' );

      elements.$container.css( 'height', $activeMenu.outerHeight() );

      $nav.attr( 'data-left', currentLeft )
          .css( 'left', currentLeft + '%' );
    };

    return $( this ).each( function() {
      methods.initMenu( $( this ) );
    });
  };
}( jQuery ));
