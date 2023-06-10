from django.db import models
import uuid
# Create your models here.


class Voiture(models.Model):
    marque = models.CharField(max_length=100, help_text="nom de la marque de la voiture")
    modele = models.CharField(max_length=100, help_text="nom du modèle de la voiture")
    annee = models.IntegerField(help_text="année de la voiture")
    disponibilite = models.BooleanField(help_text="disponibilité de la voiture")

    # autres propriétés de la voiture

    class Meta:
        db_table = "voitures"

class Client(models.Model):
    nom = models.CharField(max_length=100, help_text="nom du client")
    prenom = models.CharField(max_length=100, help_text="prénom du client")
    adresse = models.CharField(max_length=200, help_text="adresse du client")
    email = models.EmailField(help_text="adresse email du client")

    class Meta:
        db_table = "clients"

class Reservation(models.Model):
    voiture = models.ForeignKey('Voiture', on_delete=models.CASCADE,help_text="identifiant de la voiture réservée")
    client = models.ForeignKey('Client', on_delete=models.CASCADE,help_text="identifiant du client qui a réservé la voiture")
    date_debut = models.DateField(help_text="date de début de la réservation")
    date_fin = models.DateField(help_text="date de fin de la réservation")
    STATUT_CHOICES = (
        ("wating", "En attente"),
        ("accepted", "Acceptée"),
        ("finished", "Terminée"),
        )
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, help_text="statut de la réservation")

 # autres propriétés de la réservation

    class Meta:
        db_table = "reservations"

class Administrateur(models.Model):
    nom_utilisateur = models.CharField(max_length=100,help_text="nom d'utilisateur du compte administrateur")
    mot_de_passe = models.CharField(max_length=100,help_text="mot de passe du compte administrateur")
    nom_complet = models.CharField(max_length=200, help_text="nom complet du compte administrateur")
    email = models.EmailField(help_text="adresse email du compte administrateur")

    # autres propriétés du compte administrateur

    class Meta:
        db_table = "administrateurs"

class Manager(models.Model):
    nom_utilisateur = models.CharField(max_length=100,help_text="nom d'utilisateur du compte manager")
    mot_de_passe = models.CharField(max_length=100,help_text="mot de passe du compte manager")
    nom_complet = models.CharField(max_length=200,help_text="nom complet du compte manager")
    email = models.EmailField(help_text="adresse email du compte manager")

    class Meta:
        db_table = "managers"