from django.db import models
from django.contrib.auth.models import User

class Peer(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  peerID = models.CharField(blank=True, max_length=100, unique=True)
  def __str__(self):
    return f"{self.user} @ {self.peerID}"

class Room(models.Model):
  roomID = models.CharField(blank=True, max_length=100, unique=True)
  participants = models.ManyToManyField(Peer, related_name="rooms", blank=True)
  def __str__(self):
    return f"{self.roomID}"

  def serialize(self):
    return {
        "roomID" : self.roomID,
        "participants": [{"username": peer.user.username, "peerID": peer.peerID} for peer in self.participants.all()],
    }