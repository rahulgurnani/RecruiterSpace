// Backbone Model
var server_address = '/api/allrecruiters/';

var Recruiter = Backbone.Model.extend({
	url: server_address,			// url of the server here
	defaults: {
		name: '',
		company: '',
		emailid: ''
	}
});

// Backbone Collection

var Recruiters = Backbone.Collection.extend({
		url : server_address
	});

// instantiate a Collection

var recruiters = new Recruiters();

// Backbone View for one candidate

var RecruiterView = Backbone.View.extend({
	model: new Recruiter(),
	tagName: 'tr',
	initialize: function() {
		console.log("new recruiter view initialized");
		this.template = _.template($('.recruiters-list-template').html());
	},
	events: {
		'click .edit-recruiter': 'edit',
		'click .update-recruiter': 'update',
		'click .cancel': 'cancel',
		'click .delete-recruiter': 'delete' 
	},
	edit: function() {
		$('.edit-recruiter').hide();
		$('.delete-recruiter').hide();
		this.$('.update-recruiter').show();
		this.$('.cancel').show();				

		var name = this.$('.name').html();
		var company = this.$('.company').html();
		var emailid = this.$('.emailid').html();
		

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.company').html('<input type="text" class="form-control company-update" value="' + company + '">');
		this.$('.emailid').html('<input type="text" class="form-control emailid-update" value="' + emailid + '">');
		
	},
	update: function() {
		this.model.set('name', $('.name-update').val());
		this.model.set('company', $('.company-update').val());
		this.model.set('emailid', $('.emailid-update').val());
		var my_data = this.model.toJSON();
		$.ajax({
  		type: "PUT",
  		url: server_address+my_data.id,
  		data: my_data,
  		success: function(msg){
        	console.log( "Data updated: " + msg );
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
		recruitersView.render();
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
		console.log("rendering .. ")
		this.$el.html(this.template(this.model.toJSON()));
		//console.log(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all candidates

var RecruitersView = Backbone.View.extend({
	model: recruiters,
	el: $('.recruiters-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
		//res = $.get({url:get_address, });
		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('successfully got '+item._name);
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
		_.each(this.model.toArray(), function(recruiter) {
			self.$el.append((new RecruiterView({model: recruiter})).render().$el);
		});
		return this;
	}
});

var recruitersView = new RecruitersView();

$(document).ready(function() {
	$('.add-recruiter').on('click', function() {
		var recruiter = new Recruiter({
			name: $('.name-input').val(),
			company: $('.company-input').val(),
			emailid: $('.emailid-input').val(),
		});
		
		recruiter.save(null, {
			success: function(response) {
				console.log('successfully saved id = ' + response.toJSON().id);
				recruiters.add(recruiter);
			},
			error: function() {
				alert("hi, some error");
			}
		})
		$('.name-input').val('');
		$('.company-input').val('');
		$('.emailid-input').val('');
		$('.recruiter-input').val('');
	})
})
