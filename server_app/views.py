from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from server_app.models import Candidate, Recruiter
from server_app.serializers import CandidateSerializer, RecruiterSerializer
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render 
def index(request):
    context = {}
    return render(request, 'index.html',context)
@api_view(['GET', 'POST'])
def candidate_list(request, format = None):
    """
    List all candidates, or create a new candidate.
    """
    print "in candidate_list"
    print request.method
    if request.method == 'GET':
    	print request.data
        candidates = Candidate.objects.all()
        print candidates
        serializer = CandidateSerializer(candidates, many=True)
        #print serializer
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CandidateSerializer(data=request.data)
        if serializer.is_valid():
            recruiter = serializer.validated_data['recruiter']
            print len(Recruiter.objects.filter(name=recruiter))
            
            if len(Recruiter.objects.filter(name=recruiter))==0:
                print "Recruiter not present "
                return Response("recruiter not present", status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def candidate_detail(request, pk, format = None):
    """
    Retrieve, update or delete a candidate instance.
    """
    print "in candidate_detail"
    try:
        candidate = Candidate.objects.get(pk=pk)
    except Candidate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    #when we receive a get request
    if request.method == 'GET':
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CandidateSerializer(candidate, data=request.data)
        if serializer.is_valid():
            recruiter = serializer.validated_data['recruiter']
            if len(Recruiter.objects.filter(name=recruiter))==0:
                return Response("recruiter not present", status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        candidate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def recruiter_list(request,format=None):
    """
    List all recruiters, or create a new recruiter.
    """
    print "in recruiter_list"
    print request.method
    if request.method == 'GET':
        recruiters = Recruiter.objects.all()
        print recruiters
        serializer = RecruiterSerializer(recruiters, many=True)
        #print serializer
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def recruiter_detail(request, pk, format = None):
    """
    Retrieve, update or delete a recruiter instance.
    """
    print "in recruiter_detail"
    try:
        recruiter = Recruiter.objects.get(pk=pk)
    except Recruiter.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RecruiterSerializer(recruiter)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RecruiterSerializer(recruiter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        recruiter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)