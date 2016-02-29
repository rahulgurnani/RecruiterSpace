# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-28 17:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(blank=True, default=b'', max_length=100)),
                ('college', models.CharField(blank=True, default=b'', max_length=100)),
                ('emailid', models.CharField(blank=True, default=b'', max_length=100)),
                ('recruiter', models.CharField(blank=True, default=b'', max_length=100)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
