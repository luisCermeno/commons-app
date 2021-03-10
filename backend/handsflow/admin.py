from django.contrib import admin
from .models import *

class RoomAdmin(admin.ModelAdmin):
  filter_horizontal = ("participants",)

  
admin.site.register(Peer,)
admin.site.register(Room, RoomAdmin,)
