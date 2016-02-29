from rest_framework import serializers
from server_app.models import Candidate
from server_app.models import Recruiter


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id', 'name', 'college', 'emailid', 'recruiter')


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ('id', 'name', 'company', 'emailid')
