// SERVICES
// There is a basic difference between an Angular Service and an Angular Factory. Basically, one is a singleton (one instance of an object to rule them all), and the other is an instantiable object. It is beyond the scope of this workshop to study how they behave, but just know that it is a good practice to just use factories in every case. When in doubt, use a factory.

angular.module('dirs')
.factory('users', usersService)
.controller('filterController', filterController);

/*	Declare a service/factory function with dependencies on the $q and $http services
	The $q service allows you to instantiate promise objects.
	The $http service allows you to easily make AJAX calls.
	Check the Read Me page for links to more information about these services.
*/
function usersService ($q, $http) {
	// It is considered a good practice in some circles to always return an exports object, to differentiate between "private" methods and those accessible on the outside (like an API of sorts).
	var exports = {};

	exports.getUsers = function() {
		// Instantiate a promise object. When the call is done, we can either resolve or reject this promise.
		var deffered = $q.defer();

		/*	The two most important and basic settings you must pass to the AJAX call (with the $http service) are:
			method: The protocol through which we'll get our data.
			url: The url where the service is located. In this example we're just getting a JSON file included in the project.
			The "then" method receives two function. In order: the function to execute if the service call is succesful, and the function to run if the service fails.
			Basically, when succesful you want to "resolve" the promise object with the data obtained from the service call.
			and when it fails, you want to "reject" the promise with the reason why it was rejected.
			Think of it like an old "try/catch".
		 */
		$http({
			method: 'GET',
			url: 'src/js/users.json'
		})
		.then(
			function(data) {
				deffered.resolve(data);
			},
			function(reason) {
				deffered.reject(reason)
			}
		);

		return deffered.promise;
	}

	// Finally, return the exports object so your factory instance can be used.
	return exports;
}
usersService.$inject = ['$q', '$http'];

// Example controller to use the service
// The service must be injected like any other dependency
function filterController($scope, users) {
	var vm = $scope;

	// Get the desired method from our factory object to use locally
	var getUsers = users.getUsers();

	vm.myModel = 0;
	vm.myInput = 'za warudo';
	vm.myFilter = 'lowercase';
	vm.pi = Math.PI;

	// Make the service call as a promise.
	// Promises are a bit complex, but it is sufficient to say that the promise will eventually succeed or fail.
	// You must provide two functions: the first one to execute on a successful promise, the second to run when the promise fails.
	getUsers.then(
		function(response) {
			console.log('response', response);
			vm.users = response.data;
		},
		function(response) {
			return false;
		}
	);
}
scopeCtrl.$inject = ['$scope', 'users'];
