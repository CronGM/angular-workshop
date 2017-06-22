angular.module('dirs', [])
.directive('elemDirective', elemDirective)
.directive('attrDirective', attrDirective)
.directive('classDirective', classDirective)
.directive('commentDirective', commentDirective)
.directive('counter', counter);


function elemDirective() {
	return {
		/* The RESTRICT option determines the type of directive, which can be:
			*   'A'  for Attribute. Best for adding functionality to existing elements.
			*   'E' for Element. Best for custom elements.
			*   'C' for Class. Best for existing HTML that needs additional functionality.
			*   'M' for comment (not recommended)
		*/
		restrict: 'E',
		// You can use the TEMPLATE option when your HTML snippet is simple
		template: '<p>Yo soy un elemento.</p>',
	}
}

function attrDirective() {
	return {
		restrict: 'A',
		// templateUrl is more effective when dealing with complex HTML. In this case, we have created the template as a script snippet on the HTML, and are referencing it by its "id" value
		templateUrl: 'attr-directive.html'
	}
}

function classDirective() {
	return {
		restrict: 'C',
		// The third way to use a template is to simply create an HTML file, and reference it in the templateUrl option with the path to the file. This is the preferred way of using directive templates for reusable components
		templateUrl: 'assets/templates/class-directive.template.html'
	}
}

function commentDirective() {
	return {
		restrict: 'M',
		// The replace option, while deprecated, must be used for Comment directives to work correctly.
		replace: true,
		template: '<p>Yo soy un comentario.</p>',
	}
}

// Here we are creating a custom control with added functionality via the link function
function counter() {
	return {
		restrict: 'E',
		template: '<button type="button" style="display: inline-block; margin-right: .5em">-</button><span>{{ counter }}</span><button type="button" style="display: inline-block; margin-left: .5em">+</button>',
		link: function(scope, elem, attrs) {
			/* The link function is executed when the HTML element is loaded in the DOM. Think of it as a "document ready" callback
				The function link receives three parameters by default:
				* scope: The inherited scope to work in.
				* eleme: The HTML element, wrapped as an Angular element, where the directive is applied.
				* attrs: The attributes of the HTML element, as an array.
			*/

			// Assign the attribute and convert to number. If there's no attribute, default to 1.
			var increment = parseInt(attrs.increment || 1);

			// In the link function you can initialize values for your custom control.
			scope.counter = 5;

			// We know that our custom control has two buttons, so let's get them in order to add our custom functionality.
			var buttons = elem.find('button');
			var buttonSubtract = buttons[0];
			var buttonAdd = buttons[1];

			// Angular uses a simplified jQuery library called jQLite. Check the Angular Element documentation to see which functions are available.
			// https://docs.angularjs.org/api/ng/function/angular.element
			angular.element(buttonSubtract).on('click', function() {
				// Since Angular needs a way to know which DOM changes trigger model changes and viceversa, we must wrap our logic into Angulars $apply method.
				// EXERCISE: Try removing this $apply wrapper to your control's logic and see what happens.
				scope.$apply(function() {
					scope.counter = scope.counter - (increment);
					console.log(scope.counter);
				});
			});

			angular.element(buttonAdd).on('click', function() {
				scope.$apply(function() {
					scope.counter = scope.counter + parseInt(increment);
					console.log(scope.counter);
				});
			});
		}
	}
}
