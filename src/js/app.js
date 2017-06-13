// Here's where the magic will happen
// REMEMBER: Declare a module, two parameters (name, dependencies)
angular.module('app', []);

// Get module, one parameter (module_name)
angular.module('app')
.run(function($rootScope) {		// run method executes code when initializing Angular 
	// The base scope for the entire Angular app is called $rootScope
	// $rootScope must be added as a dependency to work correctly
	$rootScope.default = 'Hello from Rootscope!';
})

// You can add constant and app-wide variables using both the constant and value methods
// Each has its differences and specific feature, and are used like services (they must be passed as dependencies to work)
angular.module('app')
.constant('usuario', 'Juan Perez')
.value('user', {
	first: 'John',
	last: 'Doe'
});

angular.module('app')
.controller('myCtrl', function($scope, usuario) {	// Create controller: two parameters (controller_name, controller_function)
	// Angular controllers need a scope to work with
	$scope.favNum = 42;
	$scope.name = usuario;
})
.controller('otherCtrl', function($scope, user) {
	$scope.favNum = '007';
	$scope.default = 'Hola from Controller';
	$scope.name = user.first + ' ' + user.last;
});