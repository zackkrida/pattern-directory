/**
 * Internal dependencies
 */
import { useHistory } from '../index';

describe( 'hooks', () => {
	describe( 'history', () => {
		let windowSpy;
		beforeEach( () => {
			windowSpy = jest.spyOn( global, 'window', 'get' );
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'should return path as undefined is at the root', () => {
			windowSpy.mockImplementation( () => {
				return {
					location: {
						href: 'http://wordpress.org',
					},
				};
			} );

			const history = useHistory();

			expect( history.path ).toBeUndefined();
		} );

		it( 'should return path as expected', () => {
			const PATHNAME = 'patterns/header';

			windowSpy.mockImplementation( () => {
				return {
					location: {
						href: 'http://wordpress.org',
						pathname: PATHNAME,
					},
				};
			} );

			const history = useHistory();
			expect( history.path ).toEqual( PATHNAME );
		} );

		it( 'should update browser history', () => {
			const pushMock = jest.fn();
			windowSpy.mockImplementation( () => {
				return {
					history: {
						pushState: pushMock,
					},
					location: {
						href: 'http://wordpress.org',
					},
				};
			} );

			const history = useHistory();
			const newPath = '/header';
			history.push( newPath );

			expect( pushMock ).toHaveBeenCalled();
			expect( pushMock ).toHaveBeenCalledWith( '', '', newPath );
		} );
	} );
} );
