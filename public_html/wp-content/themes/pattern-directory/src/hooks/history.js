export const useHistory = () => {
	return {
		path: window.location.pathname,
		push: ( url ) => window.history.pushState( '', '', url ),
	};
};
