# Generated by Django 4.2.1 on 2023-08-04 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_userqualification_other_qualification_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdocuments',
            name='experience_certificate',
            field=models.CharField(max_length=255, null=True),
        ),
    ]