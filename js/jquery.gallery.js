
(function( $, undefined ) {
	
	// gallery object.
	$.Gallery = function( options, element ) {
	
		this.$el	= $( element );
		this._init( options );
		
	};
	
	function getParameterByName(name) {
    	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
       		results = regex.exec(location.search);
    	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	var currentSlide = getParameterByName('count');
	if (currentSlide != null) {
		currentSlide = parseInt(currentSlide);
	}
	
	$.Gallery.defaults 		= {
		current		: currentSlide	// index of current item
    };
	
	$.Gallery.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.Gallery.defaults, options );
			
			if (this.options.current == null) {
				this.options.current = 0;
			}
			
			// support for 3d / 2d transforms and transitions
			this.support3d		= Modernizr.csstransforms3d;
			this.support2d		= Modernizr.csstransforms;
			this.supportTrans	= Modernizr.csstransitions;
			
			this.$wrapper		= this.$el.find('.wrapper');
			
			this.$items			= this.$wrapper.children();
			this.itemsCount		= this.$items.length;
			
			this.$nav			= this.$el.find('nav');
			this.$navPrev		= this.$nav.find('.prev');
			this.$navNext		= this.$nav.find('.next');
			
			// minimum of 3 items
			if( this.itemsCount < 3 ) {
					
				this.$nav.remove();
				return false;
			
			}
			
						
			this.current		= this.options.current;
			
			this.isAnim			= false;
			
			this.$items.css({
				'opacity'	: 0,
				'visibility': 'hidden'
			});
			
			// this._validate();
			
			this._layout();
			
			// load the events
			this._loadEvents();
			
			// slideshow			
		},
		_validate			: function() {
		
			if( this.options.current < 0 || this.options.current > this.itemsCount - 1 ) {
				
				this.current = 0;
			
			}	
		
		},
		_layout				: function() {
			
			// current, left and right items
			this._setItems();
			
			// current item is not changed
			// left and right one are rotated and translated
			var leftCSS, rightCSS, currentCSS;
			
			if( this.support3d && this.supportTrans ) {
			
				leftCSS 	= {
					'-webkit-transform'	: 'translateX(-365px) scale(0.8)',
					'-moz-transform'	: 'translateX(-365px) scale(0.8)',
					'-o-transform'		: 'translateX(-365px) scale(0.8)',
					'-ms-transform'		: 'translateX(-365px) scale(0.8)',
					'transform'			: 'translateX(-365px) scale(0.8)'
				};
				
				rightCSS	= {
					'-webkit-transform'	: 'translateX(365px) scale(0.8)',
					'-moz-transform'	: 'translateX(365px) scale(0.8)',
					'-o-transform'		: 'translateX(365px) scale(0.8)',
					'-ms-transform'		: 'translateX(365px) scale(0.8)',
					'transform'			: 'translateX(365px) scale(0.8)'
				};
				
				leftCSS.opacity		= 1;
				leftCSS.visibility	= 'visible';
				rightCSS.opacity	= 1;
				rightCSS.visibility	= 'visible';
			
			}
			else if( this.support2d && this.supportTrans ) {
				
				leftCSS 	= {
					'-webkit-transform'	: 'translate(-365px) scale(0.8)',
					'-moz-transform'	: 'translate(-365px) scale(0.8)',
					'-o-transform'		: 'translate(-365px) scale(0.8)',
					'-ms-transform'		: 'translate(-365px) scale(0.8)',
					'transform'			: 'translate(-365px) scale(0.8)'
				};
				
				rightCSS	= {
					'-webkit-transform'	: 'translate(365px) scale(0.8)',
					'-moz-transform'	: 'translate(365px) scale(0.8)',
					'-o-transform'		: 'translate(365px) scale(0.8)',
					'-ms-transform'		: 'translate(365px) scale(0.8)',
					'transform'			: 'translate(365px) scale(0.8)'
				};
				
				currentCSS	= {
					'z-index'			: 999
				};
				
				leftCSS.opacity		= 1;
				leftCSS.visibility	= 'visible';				
				rightCSS.opacity	= 1;
				rightCSS.visibility	= 'visible';
			
			}
			
			this.$leftItm.css( leftCSS || {} );
			this.$rightItm.css( rightCSS || {} );
			
			this.$currentItm.css( currentCSS || {} ).css({
				'opacity'	: 1,
				'visibility': 'visible'
			}).addClass('center');
			
		},
		_setItems			: function() {
			
			this.$items.removeClass('center');
			
			this.$currentItm	= this.$items.eq( this.current );
			this.$leftItm		= ( this.current === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$items.eq( this.current - 1 );
			this.$rightItm		= ( this.current === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$items.eq( this.current + 1 );
			
			if( !this.support3d && this.support2d && this.supportTrans ) {
			
				this.$items.css( 'z-index', 1 );
				this.$currentItm.css( 'z-index', 999 );
			
			}
			
			// next & previous items
			if( this.itemsCount > 3 ) {
			
				// next item
				this.$nextItm		= ( this.$rightItm.index() === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$rightItm.next();
				this.$nextItm.css( this._getCoordinates('outright') );
				
				// previous item
				this.$prevItm		= ( this.$leftItm.index() === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$leftItm.prev();
				this.$prevItm.css( this._getCoordinates('outleft') );
			
			}
			
		},
		_loadEvents			: function() {
			
			var _self	= this;
			
			this.$navPrev.on( 'click.gallery', function( event ) {
				
				_self._navigate('prev');
				return false;
				
			});
			
			this.$navNext.on( 'click.gallery', function( event ) {
				
				_self._navigate('next');
				return false;
				
			});
			
			this.$wrapper.on( 'webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery', function( event ) {
				
				_self.$currentItm.addClass('center');
				_self.$items.removeClass('transition');
				_self.isAnim	= false;
				
			});
			
		},
		_getCoordinates		: function( position ) {
			
			if( this.support3d && this.supportTrans ) {
			
				switch( position ) {
					case 'outleft':
						return {
							'-webkit-transform'	: 'translateX(-450px) scale(0.5)',
							'-moz-transform'	: 'translateX(-450px) scale(0.5)',
							'-o-transform'		: 'translateX(-450px) scale(0.5)',
							'-ms-transform'		: 'translateX(-450px) scale(0.5)',
							'transform'			: 'translateX(-450px) scale(0.5)',
							'opacity'			: 0,
							'visibility'		: 'hidden'
						};
						break;
					case 'outright':
						return {
							'-webkit-transform'	: 'translateX(450px) scale(0.5)',
							'-moz-transform'	: 'translateX(450px) scale(0.5)',
							'-o-transform'		: 'translateX(450px) scale(0.5)',
							'-ms-transform'		: 'translateX(450px) scale(0.5)',
							'transform'			: 'translateX(450px) scale(0.5)',
							'opacity'			: 0,
							'visibility'		: 'hidden'
						};
						break;
					case 'left':
						return {
							'-webkit-transform'	: 'translateX(-365px) scale(0.8)',
							'-moz-transform'	: 'translateX(-365px) scale(0.8)',
							'-o-transform'		: 'translateX(-365px) scale(0.8)',
							'-ms-transform'		: 'translateX(-365px) scale(0.8)',
							'transform'			: 'translateX(-365px) scale(0.8)',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
					case 'right':
						return {
							'-webkit-transform'	: 'translateX(365px) scale(0.8)',
							'-moz-transform'	: 'translateX(365px) scale(0.8)',
							'-o-transform'		: 'translateX(365px) scale(0.8)',
							'-ms-transform'		: 'translateX(365px) scale(0.8)',
							'transform'			: 'translateX(365px) scale(0.8)',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
					case 'center':
						return {
							'-webkit-transform'	: 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'-moz-transform'	: 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'-o-transform'		: 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'-ms-transform'		: 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'transform'			: 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
				};
			
			}
			else if( this.support2d && this.supportTrans ) {
			
				switch( position ) {
					case 'outleft':
						return {
							'-webkit-transform'	: 'translate(-450px) scale(0.7)',
							'-moz-transform'	: 'translate(-450px) scale(0.7)',
							'-o-transform'		: 'translate(-450px) scale(0.7)',
							'-ms-transform'		: 'translate(-450px) scale(0.7)',
							'transform'			: 'translate(-450px) scale(0.7)',
							'opacity'			: 0,
							'visibility'		: 'hidden'
						};
						break;
					case 'outright':
						return {
							'-webkit-transform'	: 'translate(450px) scale(0.7)',
							'-moz-transform'	: 'translate(450px) scale(0.7)',
							'-o-transform'		: 'translate(450px) scale(0.7)',
							'-ms-transform'		: 'translate(450px) scale(0.7)',
							'transform'			: 'translate(450px) scale(0.7)',
							'opacity'			: 0,
							'visibility'		: 'hidden'
						};
						break;
					case 'left':
						return {
							'-webkit-transform'	: 'translate(-365px) scale(0.8)',
							'-moz-transform'	: 'translate(-365px) scale(0.8)',
							'-o-transform'		: 'translate(-365px) scale(0.8)',
							'-ms-transform'		: 'translate(-365px) scale(0.8)',
							'transform'			: 'translate(-365px) scale(0.8)',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
					case 'right':
						return {
							'-webkit-transform'	: 'translate(365px) scale(0.8)',
							'-moz-transform'	: 'translate(365px) scale(0.8)',
							'-o-transform'		: 'translate(365px) scale(0.8)',
							'-ms-transform'		: 'translate(365px) scale(0.8)',
							'transform'			: 'translate(365px) scale(0.8)',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
					case 'center':
						return {
							'-webkit-transform'	: 'translate(0px) scale(1)',
							'-moz-transform'	: 'translate(0px) scale(1)',
							'-o-transform'		: 'translate(0px) scale(1)',
							'-ms-transform'		: 'translate(0px) scale(1)',
							'transform'			: 'translate(0px) scale(1)',
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
				};
			
			}
			else {
			
				switch( position ) {
					case 'outleft'	: 
					case 'outright'	: 
					case 'left'		: 
					case 'right'	:
						return {
							'opacity'			: 0,
							'visibility'		: 'hidden'
						};
						break;
					case 'center'	:
						return {
							'opacity'			: 1,
							'visibility'		: 'visible'
						};
						break;
				};
			
			}
		
		},
		_navigate			: function( dir ) {
			
			if( this.supportTrans && this.isAnim )
				return false;
				
			this.isAnim	= true;
			
			switch( dir ) {
			
				case 'next' :
					
					this.current	= this.$rightItm.index();
					
					// current item moves left
					this.$currentItm.addClass('transition').css( this._getCoordinates('left') );
					
					// right item moves to the center
					this.$rightItm.addClass('transition').css( this._getCoordinates('center') );	
					
					// next item moves to the right
					if( this.$nextItm ) {
						
						// left item moves out
						this.$leftItm.addClass('transition').css( this._getCoordinates('outleft') );
						
						this.$nextItm.addClass('transition').css( this._getCoordinates('right') );
						
					}
					else {
					
						// left item moves right
						this.$leftItm.addClass('transition').css( this._getCoordinates('right') );
					
					}
					break;
					
				case 'prev' :
				
					this.current	= this.$leftItm.index();
					
					// current item moves right
					this.$currentItm.addClass('transition').css( this._getCoordinates('right') );
					
					// left item moves to the center
					this.$leftItm.addClass('transition').css( this._getCoordinates('center') );
					
					// prev item moves to the left
					if( this.$prevItm ) {
						
						// right item moves out
						this.$rightItm.addClass('transition').css( this._getCoordinates('outright') );
					
						this.$prevItm.addClass('transition').css( this._getCoordinates('left') );
						
					}
					else {
					
						// right item moves left
						this.$rightItm.addClass('transition').css( this._getCoordinates('left') );
					
					}
					break;	
					
			};
			
			this._setItems();
			
			if( !this.supportTrans )
				this.$currentItm.addClass('center');
			
		},
		destroy				: function() {
			
			this.$navPrev.off('.gallery');
			this.$navNext.off('.gallery');
			this.$wrapper.off('.gallery');
			
		}
	};
	
	var logError 			= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.gallery			= function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'gallery' );
				
				if ( !instance ) {
					logError( "cannot call methods on gallery prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for gallery instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'gallery' );
				if ( !instance ) {
					$.data( this, 'gallery', new $.Gallery( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( jQuery );