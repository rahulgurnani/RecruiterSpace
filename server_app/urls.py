from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
import views
from django.conf.urls.static import static
from django.conf import settings
#app_name = 'server_app'
urlpatterns = [
    url(r'^allcandidates/$', views.candidate_list),
    url(r'^allcandidates/(?P<pk>[0-9]+)$', views.candidate_detail),
    url(r'^allrecruiters/$', views.recruiter_list),
    url(r'^allrecruiters/(?P<pk>[0-9]+)$', views.recruiter_detail),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT )

urlpatterns = format_suffix_patterns(urlpatterns)