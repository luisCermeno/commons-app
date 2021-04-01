from django.db import models
from django.contrib.auth.models import User
import datetime

class School(models.Model):
  id = models.CharField(primary_key=True, max_length=2)
  name = models.CharField(blank=False, max_length=100)

  def __str__(self):
    return f"{self.name}"

class Profile(models.Model):
  YEAR_CHOICES = [
      ('FR', 'Freshman'),
      ('SO', 'Sophomore'),
      ('JR', 'Junior'),
      ('SR', 'Senior'),
      ('GR', 'Graduate'),
  ]

  MAJOR_CHOICES = [
      ('BU', 'Business'),
      ('EC', 'Economics'),
      ('EN', 'English'),
      ('SO', 'Sociology'),
      ('MA', 'Mathematics'),
      ('PH', 'Physics'),
      ('CS', 'Computer Science'),
      ('EE', 'Electrical Engineering'),
      ('ME', 'Mechanical Engineering'),
      ('CE', 'Civil Engineering'),
      ('MD', 'Medicine'),
  ]

  user = models.OneToOneField(User, on_delete= models.CASCADE, primary_key=True,)
  school = models.OneToOneField(School, on_delete = models.PROTECT)
  first_name = models.CharField(blank=True, max_length=100)
  last_name = models.CharField(blank=True, max_length=100)
  major = models.CharField(blank=True, max_length=2, choices = MAJOR_CHOICES)
  year = models.CharField(blank=True, max_length=2, choices = YEAR_CHOICES)
  timestamp = models.DateTimeField(default = datetime.datetime.now())
  description = models.TextField(blank=True,)

  def serialize(self):
    return {
      "school" : self.school.name,
      "first_name": self.first_name,
      "last_name" : self.last_name,
      "major" : self.major,
      "year" : self.year,
      "timestamp" : self.timestamp.strftime("%b %-d %Y"),
      "description": self.description,
    }
  def serialize_choices(self):
    return {
      "YEAR_CHOICES" : self.YEAR_CHOICES,
      "MAJOR_CHOICES" : self.MAJOR_CHOICES,
    }

  def __str__(self):
    return f"{self.user.username}"

class Room(models.Model):
  roomID = models.CharField(blank=False, max_length=100, unique=True)
  description = models.TextField(blank=False,)
  def __str__(self):
    return f"{self.roomID}"

  def serialize(self):
    return {
        "roomID" : self.roomID,
        "description": self.description,
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