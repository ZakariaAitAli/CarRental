from django.shortcuts import render

# Create your views here.
import json

from bson import ObjectId
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from pymongo.collection import Collection

from .models import Voiture

def get_next_sequence_value_voiture(sequence_name):
    client = MongoClient()
    db = client.rent_cars
    counters = db.counters
    counter = counters.find_one_and_update(
        {"id": sequence_name},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=True
    )
    return counter["sequence_value"]
def get_next_sequence_value_reservation(sequence_name):
    client = MongoClient()
    db = client.rent_cars
    counters = db.counters
    counter = counters.find_one_and_update(
        {"id": sequence_name},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=True
    )
    return counter["sequence_value"]
def get_next_sequence_value_client(sequence_name):
    client = MongoClient()
    db = client.rent_cars
    counters = db.counters
    counter = counters.find_one_and_update(
        {"id": sequence_name},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=True
    )
    return counter["sequence_value"]

#################################################VOITURE########################################################################

# afficher tout les voiture avec la methode get et ajouter une voiture
@csrf_exempt
def cars(request):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('voitures')
        voitures_list = list(collection.find({}, {'_id': False}))  # Exclude the _id field
        return JsonResponse(voitures_list, safe=False)
    elif request.method == 'POST':
        marque = request.POST.get('marque')
        modele = request.POST.get('modele')
        annee = request.POST.get('annee')
        disponibilite = request.POST.get('disponibilite')
        voiture = {
            "id": get_next_sequence_value_voiture("voitures_sequence"),  # Generate a unique ID for the document
            "marque": marque,
            "modele": modele,
            "annee": annee,
            "disponibilite": disponibilite,
        }
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('voitures')
        print(voiture)
        result = collection.insert_one(dict(voiture))
        response = {"error": 0, "msg": "added successfully"}
        return JsonResponse(response, safe=False)

#supprimer une voiture
# check that the car is available important
@csrf_exempt
def delete_car(request, car_id):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        voiture = db.get_collection('voitures')
        result_voiture = voiture.find_one({'id': int(car_id)})
        if result_voiture and result_voiture.get('disponibilite') == "true":
            result = voiture.delete_one({'id': int(car_id)})
            if result.deleted_count > 0:
                response = {"error" : 0, "msg" : "Car deleted successfully"}
                return JsonResponse(response, safe=False)
            else:
                response = {"error": 1, "msg": "Car not found"}
                return JsonResponse(response, safe=False)
        else:
            response = {"error": 1, "msg": "Car not available for deletion"}
            return JsonResponse(response, safe=False)


# modifier une voiture
@csrf_exempt
def update_car(request):
    if request.method == 'POST':
        marque = request.POST.get('marque')
        modele = request.POST.get('modele')
        annee = request.POST.get('annee')
        disponibilite = request.POST.get('disponibilite')
        car_id=request.POST.get('id')
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('voitures')
        result = collection.update_one(
            {'id': int(car_id)},
            {'$set': {
                'marque': marque,
                'modele': modele,
                'annee': annee,
                'disponibilite': disponibilite
            }}
        )
        if result.modified_count > 0:
            response = {"error": 0, "msg": "Car updated successfully"}
            return JsonResponse(response, safe=False)
        else:
            response = {"error": 1, "msg": "Car not found"}
            return JsonResponse(response, safe=False)

# afficher les champs la voiture que je veux modifier
@csrf_exempt
def show_car(request,car_id):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('voitures')
        car = collection.find_one({'id': int(car_id)},{'_id': False})
        return JsonResponse(car, safe=False)

@csrf_exempt
def show_cars_reserved(request):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('voitures')
        voitures_list = list(collection.find({"disponibilite": "false"},{'_id': False}))  # Exclude the _id field
        return JsonResponse(voitures_list, safe=False)

@csrf_exempt
def show_cars_availble(request):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('voitures')
        voitures_list = list(collection.find({"disponibilite": "true"},{'_id': False}))  # Exclude the _id field
        return JsonResponse(voitures_list, safe=False)

 #################################################RESERVATION########################################################################
 ## afficher une reservationnnnnn fiha moshkillllll
def show_reservation(request, reservation_id):
   if request.method == 'GET':
       mongo_client = MongoClient()
       db = mongo_client.rent_cars
       collection = db.get_collection('reservations')
       document = collection.find_one({'id': int(reservation_id)}, {'_id': False})
       result = []
       if document:
           client_data = document.get("client", {})
           voiture_data = document.get("voiture", {})
           nom = client_data.get("nom", "")
           prenom = client_data.get("prenom", "")
           email = client_data.get("email", "")
           modele = voiture_data.get("modele", "")
           marque = voiture_data.get("marque", "")
           reservation_id = document.get("id", "")
           date_fin = document.get("date_fin", "")
           date_debut = document.get("date_debut", "")
           data = {
               "id": reservation_id,
               "nom": nom,
               "email": email,
               "prenom": prenom,
               "modele": modele,
               "marque": marque,
               "date_debut": date_debut,
               "date_fin": date_fin
           }
           result.append(data)
       return JsonResponse(result, safe=False)
#afficher les demmandes
@csrf_exempt
def all_waiting_reservations(request):
    if request.method == 'GET':
        mongo_client = MongoClient()
        db = mongo_client.rent_cars
        reservation_db = db.get_collection('reservations')
        documents = list(reservation_db.find({"statut": "waiting"},{'_id': False}))

        result = []

        for document in documents:
            client = document.get("client", {})
            voiture = document.get("voiture", {})
            nom = client.get("nom", "")
            prenom=client.get("prenom","")
            email = client.get("email", "")
            modele = voiture.get("modele", "")
            marque = voiture.get("marque", "")
            id = document.get("id", "")
            date_fin = document.get("date_fin", "")
            date_debut = document.get("date_debut", "")

            data = {
                "id":id,
                "nom": nom,
                "email":email,
                "prenom": prenom,
                "modele":modele,
                "marque":marque,
                "date_debut": date_debut,
                "date_fin": date_fin
            }
            result.append(data)

        return JsonResponse(result, safe=False)

#afficher les reservation finies
def all_finished_reservations(request):
    if request.method == 'GET':
        mongo_client = MongoClient()
        db = mongo_client.rent_cars
        reservation_db = db.get_collection('reservations')
        documents = list(reservation_db.find({"statut": "finished"},{'_id': False}))

        result = []

        for document in documents:
            client = document.get("client", {})
            voiture = document.get("voiture", {})
            nom = client.get("nom", "")
            prenom=client.get("prenom","")
            email = client.get("email", "")
            modele = voiture.get("modele", "")
            marque = voiture.get("marque", "")
            id = document.get("id", "")
            date_fin = document.get("date_fin", "")
            date_debut = document.get("date_debut", "")

            data = {
                "id":id,
                "nom": nom,
                "email":email,
                "prenom": prenom,
                "modele":modele,
                "marque":marque,
                "date_debut": date_debut,
                "date_fin": date_fin
            }
            result.append(data)

        return JsonResponse(result, safe=False)
#afficher les reservations

@csrf_exempt
def all_reservations(request):
    if request.method == 'GET':
        mongo_client = MongoClient()
        db = mongo_client.rent_cars
        reservation_db = db.get_collection('reservations')
        documents = list(reservation_db.find({"statut": "accepted"}, {'_id': False}))

        result = []

        for document in documents:
            client = document.get("client", {})
            voiture = document.get("voiture", {})
            nom = client.get("nom", "")
            prenom=client.get("prenom","")
            email = client.get("email", "")
            modele = voiture.get("modele", "")
            marque = voiture.get("marque", "")
            id = document.get("id", "")
            date_fin = document.get("date_fin", "")
            date_debut = document.get("date_debut", "")

            data = {
                "id":id,
                "nom": nom,
                "email":email,
                "prenom": prenom,
                "modele":modele,
                "marque":marque,
                "date_debut": date_debut,
                "date_fin": date_fin
            }
            result.append(data)

        return JsonResponse(result, safe=False)
#accepter une demmande

@csrf_exempt
def accept_reservation(request):
    if request.method == 'POST':
        reservation_id = request.POST.get('id')
        client_mg = MongoClient()
        db = client_mg.rent_cars
        collection_reservation = db.get_collection('reservations')
        document = collection_reservation.find_one({'id': int(reservation_id)})

        if document:
            voiture = document.get("voiture", {})
            id = voiture.get("id","")
            collection_voiture = db.get_collection('voitures')
            result_voiture = collection_voiture.update_one(
                {'id': int(id)},
                {'$set': {
                    "disponibilite": "false",
                }}
            )
            result = collection_reservation.update_one(
                {'id': int(reservation_id)},
                {'$set': {
                    "statut": "accepted",
                }}
            )
            if result.modified_count > 0:
                response = {"error": 0, "msg": "You accepted the reservation successfully"}
                return JsonResponse(response, safe=False)
            else:
                response = {"error": 1, "msg": "Failed to update the reservation status"}
        else:
            response = {"error": 1, "msg": "Reservation not found"}

        return JsonResponse(response, safe=False)

#refuser une demmande
@csrf_exempt
def refuse_reservation(request):
    if request.method == 'POST':
        reservation_id = request.POST.get('id')
        client_mg = MongoClient()
        db = client_mg.rent_cars
        collection_reservation = db.get_collection('reservations')
        result = collection_reservation.delete_one({'id': int(reservation_id)})
        response = {"error": 0, "msg": "you have refused the reservation"}
        return JsonResponse(response, safe=False)



#affichr une reservation
#saisir une demmande est terminer
@csrf_exempt
def finish_reservation(request):
    if request.method == 'POST':
        reservation_id = request.POST.get('id')
        client_mg = MongoClient()
        db = client_mg.rent_cars
        collection_reservation = db.get_collection('reservations')
        document = collection_reservation.find_one({'id': int(reservation_id)})

        if document:
            voiture = document.get("voiture", {})
            id = voiture.get("id", "")
            collection_voiture = db.get_collection('voitures')
            result_voiture = collection_voiture.update_one(
                {'id': int(id)},
                {'$set': {
                    "disponibilite": "true",
                }}
            )
            result = collection_reservation.update_one(
                {'id': int(reservation_id)},
                {'$set': {
                    "statut": "finished",
                }}
            )
            if result.modified_count > 0:
                response = {"error": 0, "msg": "reservation finished"}
                return JsonResponse(response, safe=False)
            else:
                response = {"error": 1, "msg": "Failed to update the reservation status"}
        else:
            response = {"error": 1, "msg": "Reservation not found"}


@csrf_exempt
def insert_request_reservation(request):
    if request.method == 'POST':
        email= request.POST.get('email')
        car_id = request.POST.get('id')
        date_debut=request.POST.get('date_debut')
        date_fin=request.POST.get('date_fin')
        statut = 'waiting'
        client = MongoClient()
        db = client.rent_cars
        voiture_db= db.get_collection('voitures')
        voiture = voiture_db.find_one({'id': int(car_id)})
        client_db = db.get_collection('clients')
        client = client_db.find_one({'email': email})
        if not client:
            response = {"error": 1, "msg": "Invalid email"}
            return JsonResponse(response, safe=False)
        reservation = {
            'id':get_next_sequence_value_reservation("reservation_sequence"),
            'voiture': voiture,
            'client': client,
            'date_debut': date_debut,
            'date_fin': date_fin,
            'statut': statut
        }
        collection = db.get_collection('reservations')
        print(voiture)
        reservation = collection.insert_one(dict(reservation))
        response = {"error": 0, "msg": "added successfully"}
        return JsonResponse(response, safe=False)


#################################################Client########################################################################
#ajouter client
@csrf_exempt
def insert_client(request):
    if request.method == 'POST':
        nom = request.POST.get('nom')
        prenom = request.POST.get('prenom')
        adresse = request.POST.get('adresse')
        email = request.POST.get('email')
        client_data = {
            "id": get_next_sequence_value_client("client_sequence"),  # Generate a unique ID for the document
            "nom": nom,
            "prenom":prenom,
            "adresse": adresse,
            "email": email,
        }
        client = MongoClient()
        db = client.rent_cars
        client_db = db.get_collection('clients')
        result = client_db.insert_one(dict(client_data))
        response = {"error": 0, "msg": "added successfully"}
        return JsonResponse(response, safe=False)


# afficher client
@csrf_exempt
def show_client(request, client_id):
    if request.method == 'GET':
        client_mg = MongoClient()
        db = client_mg.rent_cars
        collection = db.get_collection('clients')
        client = collection.find_one({'id': int(client_id)},{'_id': False})
        return JsonResponse(client, safe=False)


#aficher tous les clients
@csrf_exempt
def show_all_clients(request):
    if request.method == 'GET':
        client_mg = MongoClient()
        db = client_mg.rent_cars
        collection = db.get_collection('clients')
        client_list = list(collection.find({}, {'_id': False}) ) # Exclude the _id field
        return JsonResponse(client_list, safe=False)

#modifer client
@csrf_exempt
def update_client(request):
    if request.method == 'POST':
        nom = request.POST.get('nom')
        prenom = request.POST.get('prenom')
        adresse = request.POST.get('adresse')
        email = request.POST.get('email')
        client_id = request.POST.get('id')
        client_mg = MongoClient()
        db = client_mg.rent_cars
        collection = db.get_collection('clients')
        result = collection.update_one(
            {'id': int(client_id)},
            {'$set': {
                "nom": nom,
                "prenom": prenom,
                "adresse": adresse,
                "email": email,
            }}
        )
        if result.modified_count > 0:
            response = {"error": 0, "msg": "Client updated successfully"}
            return JsonResponse(response, safe=False)
        else:
            response = {"error": 1, "msg": "Client not found"}
            return JsonResponse(response, safe=False)


#supprimer client
@csrf_exempt
def delete_client(request, client_id):
    if request.method == 'GET':
        client_mg = MongoClient()
        db = client_mg.rent_cars
        client = db.get_collection('clients')
        result = client.delete_one({'id': int(client_id)})
        if result.deleted_count > 0:
            response = {"error" : 0, "msg": "Client deleted successfully"}
            return JsonResponse(response, safe=False)
        else:
            response = {"error": 1, "msg": "Client not found"}
            return JsonResponse(response, safe=False)