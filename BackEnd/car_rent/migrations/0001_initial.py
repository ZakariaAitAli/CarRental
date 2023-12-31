# Generated by Django 4.1.9 on 2023-05-25 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrateur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_utilisateur', models.CharField(help_text="nom d'utilisateur du compte administrateur", max_length=100)),
                ('mot_de_passe', models.CharField(help_text='mot de passe du compte administrateur', max_length=100)),
                ('nom_complet', models.CharField(help_text='nom complet du compte administrateur', max_length=200)),
                ('email', models.EmailField(help_text='adresse email du compte administrateur', max_length=254)),
            ],
            options={
                'db_table': 'administrateurs',
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(help_text='nom du client', max_length=100)),
                ('prenom', models.CharField(help_text='prénom du client', max_length=100)),
                ('adresse', models.CharField(help_text='adresse du client', max_length=200)),
                ('email', models.EmailField(help_text='adresse email du client', max_length=254)),
            ],
            options={
                'db_table': 'clients',
            },
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_utilisateur', models.CharField(help_text="nom d'utilisateur du compte manager", max_length=100)),
                ('mot_de_passe', models.CharField(help_text='mot de passe du compte manager', max_length=100)),
                ('nom_complet', models.CharField(help_text='nom complet du compte manager', max_length=200)),
                ('email', models.EmailField(help_text='adresse email du compte manager', max_length=254)),
            ],
            options={
                'db_table': 'managers',
            },
        ),
        migrations.CreateModel(
            name='Voiture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marque', models.CharField(help_text='nom de la marque de la voiture', max_length=100)),
                ('modele', models.CharField(help_text='nom du modèle de la voiture', max_length=100)),
                ('annee', models.IntegerField(help_text='année de la voiture')),
                ('disponibilite', models.BooleanField(help_text='disponibilité de la voiture')),
            ],
            options={
                'db_table': 'voitures',
            },
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_debut', models.DateField(help_text='date de début de la réservation')),
                ('date_fin', models.DateField(help_text='date de fin de la réservation')),
                ('statut', models.CharField(choices=[('wating', 'En attente'), ('accepted', 'Acceptée'), ('finished', 'Terminée')], help_text='statut de la réservation', max_length=20)),
                ('client', models.ForeignKey(help_text='identifiant du client qui a réservé la voiture', on_delete=django.db.models.deletion.CASCADE, to='car_rent.client')),
                ('voiture', models.ForeignKey(help_text='identifiant de la voiture réservée', on_delete=django.db.models.deletion.CASCADE, to='car_rent.voiture')),
            ],
            options={
                'db_table': 'reservations',
            },
        ),
    ]
