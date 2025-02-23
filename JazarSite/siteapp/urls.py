from django.urls import path
from .views import LoginAPIView, JobPostAPIView, JobListAPIView, JobApplicationAPIView, BlogCreateAPIView,JobApplicationExportView, BlogListAPIView, DeleteJobAPIView, GoogleLoginAPIView, ContactUsAPIView,ContactUsListAPIView, UpdateJobAPIView, JobApplicationListAPIView, DeleteBlogAPIView, UpdateBlogAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('post-job/', JobPostAPIView.as_view(), name='post-job'),
    path('list-jobs/', JobListAPIView.as_view(), name='list-jobs'),  # Visitors fetch jobs
    path('apply-job/', JobApplicationAPIView.as_view(), name='apply-job'),
    path('create-blog/', BlogCreateAPIView.as_view(), name='create-blog'),  # Admin posts a blog
    path('list-blogs/', BlogListAPIView.as_view(), name='list-blogs'),  # Visitors fetch blogs
    path('delete-job/<int:job_id>/', DeleteJobAPIView.as_view(), name='delete-job'),
    path('google-login/', GoogleLoginAPIView.as_view(), name='google-login'),
    path('login/', LoginAPIView.as_view(), name='login'),  # Trailing slash added
    path('contact-us/', ContactUsAPIView.as_view(), name='contact_us'),
    path('update-job/<int:job_id>/', UpdateJobAPIView.as_view(), name='update_job'),
    path('job-applications/', JobApplicationListAPIView.as_view(), name='job-application-list'),
    path('contact-list/', ContactUsListAPIView.as_view(), name='contact-us-list'),
    path('delete-blog/<int:blog_id>/', DeleteBlogAPIView.as_view(), name='delete-blog'),
    path('update-blog/<int:blog_id>/', UpdateBlogAPIView.as_view(), name='update-blog'),
    path("export-excel/", JobApplicationExportView.as_view(), name="export-excel"),
]

