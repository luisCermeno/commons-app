from django.db import models
from django.contrib.auth.models import User

class Peer(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  peerID = models.CharField(blank=True, max_length=100, unique=True)
  
class Room(models.Model):
  participants = models.ManyToManyField(Peer, related_name="rooms", blank=True)