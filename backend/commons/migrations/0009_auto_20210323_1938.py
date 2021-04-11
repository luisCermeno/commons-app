# Generated by Django 3.1.7 on 2021-03-24 02:38

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commons', '0008_auto_20210312_2347'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='participants',
        ),
        migrations.AddField(
            model_name='peer',
            name='room',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='commons.room'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 23, 19, 38, 45, 751124)),
        ),
    ]