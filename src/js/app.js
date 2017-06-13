// Here's where the magic will happen
// REMEMBER: Declare a module, two parameters (name, dependencies)
angular.module('app', []);

// Get module, one parameter (module_name)
angular.module('app')
.run(function($rootScope) {		// run method executes code when initializing Angular 
	// The base scope for the entire Angular app is called $rootScope
	// $rootScope must be added as a dependency to use
	$rootScope.default = 'Hello from Rootscope!';
});

angular.module('app')
.controller('myCtrl', function($scope) {	// Create controller: two parameters (controller_name, controller_function)
	// Angular controllers need a scope to work with
	$scope.favNum = 42;
})
.controller('otherCtrl', function($scope) {
	$scope.favNum = '007';
	$scope.default = 'Hola from Controller';
});