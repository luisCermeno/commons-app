from django.db import models
from django.contrib.auth.models import User
import datetime

class Room(models.Model):
  roomID = models.CharField(blank=True, max_length=100, unique=True)
  def __str__(self):
    return f"{self.roomID}"

  def serialize(self):
    return {
        "roomID" : self.roomID,
        "participants": [{"username": peer.user.username, "peerID": peer.peerID} for peer in self.participants.all()],
    }

class Peer(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  peerID = models.CharField(blank=True, max_length=100, unique=True)
  room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="participants")
  def __str__(self):
    return f"{self.user} @ {self.peerID}"

class Message(models.Model):
  room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="messages", null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
  body = models.TextField(null=True, blank=True)
  timestamp = models.DateTimeField(default = datetime.datetime.now())

  def __str__(self):
    return f'{self.user} @ {self.timestamp.strftime("%b %-d %Y, %-I:%M %p")}: "{self.body}"'

  def serialize(self):
    return {
        "username" : self.user.username,
        "body": self.body,
        "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
    }