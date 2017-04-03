/**
 * jQuery Slider Menu Plugin
 *
 * @version 1.2.0
 */
( function( $ ) {
  'use strict';

  $.fn.sliderMenu = function( options ) {
    var settings = $.extend({

    }, options ), methods = {};

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
        methods.clickHandler( event, $( this ) );
      });
    };

    methods.clickHandler = function( event, $link ) {
      var $container   = $link.closest( '.slider-menu' ),
          $parentItem  = $link.parent( '.slider-menu__item' ),
          $parentMenu  = $parentItem.parent( '.slider-menu__menu' ),
          $childMenu   = $( '> .slider-menu__menu', $parentItem );

      if ( $childMenu.length || $link.hasClass( 'slider-menu__back' ) ) {
        event.preventDefault();

        if ( $parentItem.data( 'vertical' ) ) {
          methods.toggleExpand( $link );
        } else {
          methods.slideController( $link );
        }
      }
    };

    methods.toggleExpand = function( $link ) {
      var $container   = $link.closest( '.slider-menu' ),
          $parentItem  = $link.parent( '.slider-menu__item' ),
          $parentMenu  = $parentItem.parent( '.slider-menu__menu' ),
          $childMenu   = $( '> .slider-menu__menu', $parentItem );

      if ( $childMenu.is( ':visible' ) ) {
        // Hide
        $parentMenu.addClass( 'slider-menu--active' );
        $childMenu.hide();
        $container.css( 'height', $parentMenu.height() );

        $link.removeClass( 'slider-menu__link--active-link' );
      } else {
        // Show
        $childMenu.show();
        $container.css( 'height', $parentMenu.height() );

        $link.addClass( 'slider-menu__link--active-link' );
      }
    };

    methods.slideController = function( $link ) {
      var $container   = $link.closest( '.slider-menu' ),
          $parentItem  = $link.parent( '.slider-menu__item' ),
          $parentMenu  = $parentItem.parent( '.slider-menu__menu' );

      $( '.slider-menu__item--vertical .slider-menu__menu', $container ).hide();
      $( '.slider-menu__item--vertical .slider-menu__link', $container ).removeClass( 'slider-menu__link--active-link' );
      $parentMenu.removeClass( 'slider-menu--active' );

      if ( $link.hasClass( 'slider-menu__back' ) ) {
        methods.slide( $link, true );
      } else {
        methods.slide( $link );
      }
    };

    methods.slide = function( $link, back ) {
      var $container  = $link.closest( '.slider-menu' ),
          $nav        = $( '.slider-menu__container', $container ),
          $parentItem = $link.parent( '.slider-menu__item' ),
          $parentMenu = $parentItem.parent( '.slider-menu__menu' ),
          $activeMenu = back ? $parentMenu.parent().parent() : $( '> .slider-menu__menu', $parentItem ),
          currentLeft = back ? parseInt( $nav.attr( 'data-left' ) ) + 100 : parseInt( $nav.attr( 'data-left' ) ) - 100;

      $activeMenu.addClass( 'slider-menu--active' )
                 .parents( '.slider-menu__menu' ).addClass( 'slider-menu--active' );

      $container.css( 'height', $activeMenu.height() );

      $nav.attr( 'data-left', currentLeft )
          .css( 'left', currentLeft + '%' );
    };

    return $( this ).each( function() {
      methods.init( $( this ) );
    });
  };
})( jQuery );
