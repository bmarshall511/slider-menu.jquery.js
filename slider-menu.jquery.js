/**
 * jQuery Slider Menu Plugin
 *
 * @version 1.0.0
 */
( function( $ ) {
  'use strict';

  $.fn.sliderMenu = function() {
    $( this ).each( function() {
      var $menu       = $( this ).clone(),
          $newMenu    = $( '<div>' ).addClass( 'slider-menu' ),
          $nav        = $( '<nav>' ).addClass( 'slider-menu__container' )
                                    .attr({
                                      'role':       'navigation',
                                      'aria-label': 'Menu'
                                    }),
          currentLeft = 0;

      // Build the new menu.
      $menu.attr( 'class', 'slider-menu__menu' );
      $( 'ul', $menu ).addClass( 'slider-menu__menu' )
                      .prepend( '<li><a href="#" class="slider-menu__back"><span class="slider-menu__text">Back</span></a>' )
                      .parent().addClass( 'slider-menu--has-children' );
      $( 'li', $menu ).addClass( 'slider-menu__item' );
      $( 'a', $menu ).addClass( 'slider-menu__link' );
      $nav.html( $menu );
      $( '[data-vertical="true"]', $nav ).addClass( 'slider-menu__item--vertical' );
      $newMenu.html( $nav );

      // Interaction functionality.
      $( $newMenu ).on( 'click', '.slider-menu__link', function( e ) {
        var $clickedLink = $( this ),
            $container   = $clickedLink.closest( '.slider-menu' ),
            $parentItem  = $clickedLink.parent( '.slider-menu__item' ),
            $parentMenu  = $parentItem.parent( '.slider-menu__menu' ),
            $childMenu   = $( '> .slider-menu__menu', $parentItem );

        if ( $childMenu.length || $clickedLink.hasClass( 'slider-menu__back' ) ) {
          e.preventDefault();

          if ( $parentItem.data( 'vertical' ) ) {
            // Vertical menu.
            if ( $childMenu.is( ':visible' ) ) {
              // Hide
              $parentMenu.addClass( 'slider-menu--active' );
              $childMenu.hide();
              $container.css( 'height', $parentMenu.height() );
              /*$childMenu.slideUp( 200, function() {
                $container.css( 'height', $parentMenu.height() );
              });*/
              $clickedLink.removeClass( 'slider-menu__link--active-link' );
            } else {
              // Show
              $childMenu.show();
              $container.css( 'height', $parentMenu.height() );
              /*$childMenu.slideDown( 200, function() {
                $container.css( 'height', $parentMenu.height() );
              });*/
              $clickedLink.addClass( 'slider-menu__link--active-link' );
            }
          } else {
            $( '.slider-menu__item--vertical .slider-menu__menu', $container ).hide();
            $( '.slider-menu__item--vertical .slider-menu__link', $container ).removeClass( 'slider-menu__link--active-link' );

            // Horizontal menu.
            if ( $clickedLink.hasClass( 'slider-menu__back' ) ) {
              // Go back.
              var $activeMenu = $parentMenu.parent().parent();

              currentLeft -= 100;

              $nav.css( 'left', '-' + currentLeft + '%' );

              $parentMenu.removeClass( 'slider-menu--active' );
              $activeMenu.addClass( 'slider-menu--active' )
                         .parents( '.slider-menu__menu' ).addClass( 'slider-menu--active' );

              $container.css( 'height', $activeMenu.height() );
            } else {
              currentLeft += 100;

              $nav.css( 'left', '-' + currentLeft + '%' );

              $parentMenu.removeClass( 'slider-menu--active' );
              $childMenu.addClass( 'slider-menu--active' )
                        .parents( '.slider-menu__menu' ).addClass( 'slider-menu--active' );

              $container.css( 'height', $childMenu.height() );
            }
          }
        }
      });

      // Replace the current menu.
      $( this ).replaceWith(  $newMenu  );
    });
  };
})( jQuery );
