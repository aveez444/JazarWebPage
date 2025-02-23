from django.db import models



class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    eligibility = models.TextField()
    roleOverview = models.TextField()
    preferred = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)  # Stores job post time

    def __str__(self):
        return self.title



def cv_upload_path(instance, filename):
    return f"uploads/cv/{instance.pk}/{filename}"

class JobApplication(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    location = models.CharField(max_length=255)
    linkedin_profile = models.URLField(blank=True, null=True)
    job_title = models.CharField(max_length=255)
    qualification = models.CharField(max_length=255)
    cv = models.FileField(upload_to=cv_upload_path) 

    applied_at = models.DateTimeField(auto_now_add=True)  # Timestamp of submission

    def __str__(self):
        return f"{self.full_name} - {self.job_title}"



class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title




class ContactUs(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.first_name} {self.last_name}"

