// Backbone Model
var server_address = '/api/allcandidates/';

// Candidate model defined
var Candidate = Backbone.Model.extend({
	url: server_address,			// url of the server here
	defaults: {
		name: '',
		college: '',
		emailid: '',
		recruiter:''
	},
	idAttribute: "id"
});

// Backbone Collection, Candidates collection defined

var Candidates = Backbone.Collection.extend({
		url : server_address
	});

// instantiate a Collection
var candidates = new Candidates();

// Backbone View for one candidate
var CandidateView = Backbone.View.extend({
	model: new Candidate(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.candidates-list-template').html());
	},
	events: {
		'click .edit-candidate': 'edit',
		'click .update-candidate': 'update',
		'click .cancel': 'cancel',
		'click .delete-candidate': 'delete' 
	},
	edit: function() {
		$('.edit-candidate').hide();
		$('.delete-candidate').hide();
		this.$('.update-candidate').show();
		this.$('.cancel').show();				

		var name = this.$('.name').html();
		var college = this.$('.college').html();
		var emailid = this.$('.emailid').html();
		var recruiter = this.$('.recruiter').html();

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.college').html('<input type="text" class="form-control college-update" value="' + college + '">');
		this.$('.emailid').html('<input type="text" class="form-control emailid-update" value="' + emailid + '">');
		this.$('.recruiter').html('<input type="text" class="form-control recruiter-update" value="' + recruiter + '">');
	},
	update: function() {
		console.log('update function called');
		var self = this;
		var my_data = {
						id: this.model.toJSON().id,
						name: $('.name-update').val(),
						college: $('.college-update').val(),
						emailid: $('.emailid-update').val(),
						recruiter: $('.recruiter-update').val(),
					};
		$.ajax({
  		type: "PUT",
  		url: server_address+my_data.id,
  		data: my_data,
  		success: function(msg){
        	console.log( "Data updated: " + msg );
        	self.model.set(my_data);

  		},
  		error: function(XMLHttpRequest, textStatus, errorThrown) {
     	alert("some error" );

     	console.log(XMLHttpRequest)
     	console.log(textStatus);
     	console.log(errorThrown);
  		}
		});
	},
	cancel: function() {
		candidatesView.render();
	},
	delete: function() {
		this.model.destroy({
			success: function(response) {
				console.log("successfully deleted");
			},
			error: function(response) {
				console.log("some error");
			}
		});

	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON())); // data will go into row here
		return this;
	}
});


// Backbone View for all candidates
var CandidatesView = Backbone.View.extend({
	model: candidates,
	el: $('.candidates-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);	// every time we add a candidate we render
		this.model.on('change', function() {		// every time there is a update of candidate
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
		// here we fetches all the instances of candidates
		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('successfully got candidate id '+item.id);
				})
			},
			error: function() {
				console.log("failed to get");
			}
		})
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(candidate) {
			self.$el.append((new CandidateView({model: candidate})).render().$el);
		});
		return this;
	}
});

var candidatesView = new CandidatesView();

$(document).ready(function() {
	// on clicking add candidate the following function will be executed
	$('.add-candidate').on('click', function() {
		var candidate = new Candidate({
			name: $('.name-input').val(),
			college: $('.college-input').val(),
			emailid: $('.emailid-input').val(),
			recruiter: $('.recruiter-input').val()
		});
  		
		candidate.save(null, {
			success: function(response) {
				console.log('successfully saved id = ' + response.toJSON().id);
				//candidate = new Candidate(response.toJSON());
				candidates.add(candidate);
			},
			error: function() {
				alert("hi, some error");
			}
		});
		// resetting the input fields to blank again
		$('.name-input').val('');
		$('.college-input').val('');
		$('.emailid-input').val('');
		$('.recruiter-input').val('');
	})
})
