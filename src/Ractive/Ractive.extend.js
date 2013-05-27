extend = function ( childProps ) {

	var Parent, Child, key;

	Parent = this;

	Child = function () {
		Ractive.apply( this, arguments );

		if ( this.init ) {
			this.init.apply( this, arguments );
		}
	};

	// extend child with parent methods
	for ( key in Parent.prototype ) {
		if ( Parent.prototype.hasOwnProperty( key ) ) {
			Child.prototype[ key ] = Parent.prototype[ key ];
		}
	}

	// extend child with specified methods, as long as they don't override Ractive.prototype methods
	for ( key in childProps ) {
		if ( childProps.hasOwnProperty( key ) ) {
			if ( Ractive.prototype.hasOwnProperty( key ) ) {
				throw new Error( 'Cannot override "' + key + '" method or property of Ractive prototype' );
			}

			Child.prototype[ key ] = childProps[ key ];
		}
	}

	Child.extend = Parent.extend;

	return Child;
};