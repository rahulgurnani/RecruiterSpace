// Backbone Model
var server_address = '/api/allcandidates/';

var Candidate = Backbone.Model.extend({
	url: server_address,			// url of the server here
	defaults: {
		name: '',
		college: '',
		emailid: '',
		recruiter:''
	}
});

// Backbone Collection

var Candidates = Backbone.Collection.extend({
		url : server_address
	});

// instantiate a Collection

var candidates = new Candidates();

var candidate1 = new Candidate({
		name: "Rahul",
		college: "IIT Kgp",
		emailid: "21",
		recruiter: "hr"
});

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
		this.model.set('name', $('.name-update').val());
		this.model.set('college', $('.college-update').val());
		this.model.set('emailid', $('.emailid-update').val());
		this.model.set('recruiter', $('.recruiter-update').val());
		this.model.save(null, { 
			success: function(response) {
			console.log('successfully updated');
		},
		error: function(response) {
			console.log('error in update');
		} }
		) ;
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
		this.$el.html(this.template(this.model.toJSON()));
		//console.log(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all candidates

var CandidatesView = Backbone.View.extend({
	model: candidates,
	el: $('.candidates-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		/*this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);*/
		this.model.on('remove', this.render, this);
		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('successfully got '+item);
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
	$('.add-candidate').on('click', function() {
		var candidate = new Candidate({
			name: $('.name-input').val(),
			college: $('.college-input').val(),
			emailid: $('.emailid-input').val(),
			recruiter: $('.recruiter-input').val()
		});
		/*$.post( server_address, 
			candidate.toJSON(),
			function( data ) {
  			console.log("returned");
  			$( ".result" ).html( data ); 
  		});*/
  		$.ajax({
  		type: "POST",
  		url: server_address,
  		data: candidate.toJSON(),
  		success: function(msg){
        	console.log( "Data Saved: " + msg );
  			candidates.add(candidate);
  		},
  		error: function(XMLHttpRequest, textStatus, errorThrown) {
     	alert("some error" );
     	console.log(XMLHttpRequest)
     	console.log(textStatus);
     	console.log(errorThrown);
  		}
		});
		//candidate.fetch({url:server_address, type:'POST'});
		$('.name-input').val('');
		$('.college-input').val('');
		$('.emailid-input').val('');
		$('.recruiter-input').val('');
	})
})
