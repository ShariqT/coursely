var courseList = [
		{"name":"HIS 101", 
		"desc": "Western Civilization from 1500 to modern times",
		"professor": "James Watson"
		},
		{"name": "CHM 211", "desc": "Organic chemistry for beginners and newbies"},
		{"name": "ENG 333", 
		"desc": "Post Modernism in American Writing",
		"professor": "James Watson",
		"books": [ "Giovanni's Room", "Fear and Loathing on the Campagin Trail '72"],
		"schedule": "MWF 10am - 11am"
	}


	];

var App = Ember.Application.create();

App.Router.map(function(){
	this.route("course", {path:"/course/:name"});
});


App.CourseRoute = Ember.Route.extend({
	model: function(params){
		console.log(params);
		for(var i = 0; i < courseList.length; i++){
			if(courseList[i].name == params.name){
				console.log(courseList[i]);
				return courseList[i];
			}
		}
	},

	setupController:function(controller,model){
		console.log(model);
		controller.set('model', model);
		controller.set('content', model);
	}
});

App.IndexController = Ember.Controller.extend({

	actions:{
		findCourse: function(){
			console.log($('#course').typeahead('val'));
			for(var i = 0; i < courseList.length; i++){
				if(courseList[i].name == $('#course').typeahead('val')){
					console.log(courseList[i]);
					this.transitionToRoute('course', courseList[i]);
				}
			}

			//alert('Could not find that course!');
		}
	}
});

App.IndexView = Ember.View.extend({
	didInsertElement: function(){
		var courses = new Bloodhound({
			local: courseList,	
		 	datumTokenizer: function(d){
						return Bloodhound.tokenizers.whitespace(d.name);
					},
			queryTokenizer: Bloodhound.tokenizers.whitespace
		});
 
		courses.initialize();


		$('#course').typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 3
		},
		{
		  name: 'courses',
		  displayKey: 'name',
		  source: courses.ttAdapter(),
		  templates:{
				suggestion: Handlebars.compile("<div class='typeaheadItem'><strong>{{name}}</strong><br />{{desc}}</div>")
			}
		});
	}	
});



/*$(function(){

	


	var courses = new Bloodhound({
	local: courseList,	
 	datumTokenizer: function(d){
				return Bloodhound.tokenizers.whitespace(d.name);
			},
	queryTokenizer: Bloodhound.tokenizers.whitespace
});
 
// kicks off the loading/processing of `local` and `prefetch`
courses.initialize();


	$('#course').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 3
	},
	{
	  name: 'courses',
	  displayKey: 'name',
	  source: courses.ttAdapter(),
	  templates:{
			suggestion: Handlebars.compile("<div class='typeaheadItem'><strong>{{name}}</strong><br />{{desc}}</div>")
		}
	});



	$('#courseForm').submit(function(){
		if( $('#course').typeahead('val') !== ""){

		}
		evt.preventDefault();
		return false;
	});
});*/