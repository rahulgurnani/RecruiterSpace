from django.db import models



class Candidate(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	name = models.CharField(max_length=100, blank=False, default='')
	college = models.CharField(max_length=100, blank=False, default='')
	emailid = models.CharField(max_length=100, blank=False, default='')
	recruiter = models.CharField(max_length=100, blank=False, default='')
	class Meta:
		ordering = ('created',)

class Recruiter(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	name = models.CharField(max_length=100, blank=True, default='')
	company = models.CharField(max_length=100, blank=True, default='')
	emailid = models.CharField(max_length=100, blank=True, default='')
	class Meta:
		ordering = ('created',)