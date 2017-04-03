/**
 * jQuery Slider Menu Plugin
 *
 * @version 1.2.0
 */
( function( $ ) {
  'use strict';

  $.fn.sliderMenu = function( options ) {
    var settings = $.extend({

    }, options ),
    elements = {}, methods = {};

    methods.init = function( element ) {
      var $menu = this.buildMenu( element.clone() );
      element.replaceWith(  $menu  );
      this.initMenu( $menu );
    };

    methods.buildMenu = function( $menu ) {
      var $newMenu = $( '<div>' ).addClass( 'slider-menu' ),
          $nav     = $( '<nav>' ).attr({
                                   'class'      : 'slider-menu__container',
                                   'role'       : 'navigation',
                                   'aria-label' : 'Menu',
                                   'data-left'  : 0
                                 });

      $menu.attr( 'class', 'slider-menu__menu' );
      $( 'ul', $menu ).addClass( 'slider-menu__menu' )
                      .prepend( '<li><a href="#" class="slider-menu__back"><span class="slider-menu__text">Back</span></a>' )
                      .parent()
                      .addClass( 'slider-menu--has-children' );
      $( 'li', $menu ).addClass( 'slider-menu__item' );
      $( 'a', $menu ).addClass( 'slider-menu__link' );
      $nav.html( $menu );
      $( '[data-vertical="true"]', $nav ).addClass( 'slider-menu__item--vertical' );
      $newMenu.html( $nav );

      return $newMenu;
    };

    methods.initMenu = function( $menu ) {
      $( $menu ).on( 'click', '.slider-menu__link', function( event ) {
        elements.$container  = $( this ).closest( '.slider-menu' );
        elements.$parentItem = $( this ).parent( '.slider-menu__item' );
        elements.$parentMenu = elements.$parentItem.parent( '.slider-menu__menu' );
        elements.$childMenu  = $( '> .slider-menu__menu', elements.$parentItem );

        methods.clickHandler( event, $( this ) );
      });
    };

    methods.clickHandler = function( event, $link ) {
      if ( elements.$childMenu.length || $link.hasClass( 'slider-menu__back' ) ) {
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
        elements.$parentMenu.addClass( 'slider-menu--active' );
        elements.$childMenu.hide();
        elements.$container.css( 'height', elements.$parentMenu.height() );

        $link.removeClass( 'slider-menu__link--active-link' );
      } else {
        // Show
        elements.$childMenu.show();
        elements.$container.css( 'height', elements.$parentMenu.height() );

        $link.addClass( 'slider-menu__link--active-link' );
      }
    };

    methods.slideController = function( $link ) {
      $( '.slider-menu__item--vertical .slider-menu__menu', elements.$container ).hide();
      $( '.slider-menu__item--vertical .slider-menu__link', elements.$container ).removeClass( 'slider-menu__link--active-link' );
      elements.$parentMenu.removeClass( 'slider-menu--active' );

      if ( $link.hasClass( 'slider-menu__back' ) ) {
        methods.slide( $link, true );
      } else {
        methods.slide( $link );
      }
    };

    methods.slide = function( $link, back ) {
      var $nav        = $( '.slider-menu__container', elements.$container ),
          $activeMenu = back ? elements.$parentMenu.parent().parent() : $( '> .slider-menu__menu', elements.$parentItem ),
          currentLeft = back ? parseInt( $nav.attr( 'data-left' ), 10 ) + 100 : parseInt( $nav.attr( 'data-left' ), 10 ) - 100;

      $activeMenu.addClass( 'slider-menu--active' )
                 .parents( '.slider-menu__menu' ).addClass( 'slider-menu--active' );

      elements.$container.css( 'height', $activeMenu.height() );

      $nav.attr( 'data-left', currentLeft )
          .css( 'left', currentLeft + '%' );
    };

    return $( this ).each( function() {
      methods.init( $( this ) );
    });
  };
}( jQuery ));
