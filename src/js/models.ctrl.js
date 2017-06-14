angular.module('app')
.controller('modelsCtrl', modelsCtrl)
.controller('extraCtrl', extraCtrl);

/* CONTROLLER BEST PRACTICES
	* It's a good practice to declare your controller function outside of the controller's own declaration (seen above). This makes the code easier to read.
	* It's a good practice to always name your functions, as it makes code easier to debug. By following the above practice, your functions will always be named.
	* It's not only a good practice, but necessary, to inject your dependencies as strings, so they are not lost on code minification.
*/
function modelsCtrl ($scope) {
	// If you are going to use controller aliases, you must add your viewmodel properties to the controller object's instance, instead of adding them to the $scope.
	// GOOD PRACTICE: assign "this" to a variable that is semantic. In this case we use "vm" for "view-model", but you can use anything you want.
	var vm = this;

	// $scope.test = 'Hola mundi!';		<--- Don't use this when using controller aliases, or your variables will be lost in the document
	vm.test = 'Hola mundi!';
}
/*
Inject the necesarry dependencies as an array of strings, where each item in the array is a dependency to inject.
This dependencies are the same that are passed to the controller function as parameters
*/
modelsCtrl.$inject = ['$scope'];

function extraCtrl ($scope) {
	var vm = this;

	vm.test = 'Extra extri!';
}
extraCtrl.$inject = ['$scope'];