from django.shortcuts import render

# Create your views here.
def candidates_index(request):
	context = {}
	return render(request, 'candidate_index.html',context)

def recruiters_index(request):
	context = {}
	return render(request, 'recruiter_index.html',context)

def index(request):
	context = {}
	return render(request, 'index.html',context)